from flask import Flask, jsonify, request, send_from_directory
from global_functions import pretty_time_difference, pretty_comment, search_username, search_name, sort_by_method, sort_latest_to_oldest, hash_password, verify_hash
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from AesEverywhere import aes256
import random, string
from datetime import datetime
import time
import cloudinary
import cloudinary.uploader
import os
from flask_migrate import Migrate

# Declaring app configs
app = Flask(__name__,
        static_url_path='/',
        static_folder='client-react/build')

app.secret_key = "hello"
app.config['SQLALCHEMY_DATABASE_URI'] = ''
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
db = SQLAlchemy(app)
CORS(app)
migrate = Migrate(app, db)

# Declaring cloudinary configs for api requests
cloudinary.config( 
  cloud_name = "", 
  api_key = "", 
  api_secret = "" 
)


# Declaring database models

# User model, handles everything related to the user.
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(300), unique=True, nullable=False)
    name = db.Column(db.String(300), unique=False, nullable=False)
    username = db.Column(db.String(300), unique=True, nullable=False)
    password = db.Column(db.LargeBinary, nullable=False, unique=False)
    date_joined = db.Column(db.DateTime, nullable=True, default=datetime.utcnow)
    status = db.Column(db.String(100), unique=False, nullable=True, default="Offline")
    age = db.Column(db.Integer, unique=False, nullable=True, default=0)
    gender = db.Column(db.String(200), nullable=True, default="Male")
    about = db.Column(db.String(400), nullable=True, default="Empty")
    banner = db.Column(db.String(300), nullable=True, default="https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582690/TalentFlex_Static/Others/default_banner_j6ng32.jpg")
    image = db.Column(db.String(300), unique=False, nullable=True, default="https://res.cloudinary.com/dhcl5t8to/image/upload/v1637709372/TalentFlex_Static/Others/profile_qglxar.png")
    session_token = db.Column(db.String(300), nullable=True, default="")
    posts = db.relationship('Post', backref='user', lazy=True)
    comments = db.relationship('Comment', backref='user', lazy=True)
    likes = db.relationship('Like', backref='user', lazy=True)
    recieved_notifs = db.relationship('Notification', 
        primaryjoin="User.id == Notification.to_user_id",
        backref="to_user",
        lazy=True)
    sent_notifs = db.relationship('Notification', 
        primaryjoin="User.id == Notification.from_user_id",
        backref="from_user",
        lazy=True)


# Post model, handles everything related to posts
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.String(300), unique=False, nullable=True)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    media = db.Column(db.String(300), unique=True, nullable=False)
    type = db.Column(db.String(300), unique=False, nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'),
        nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
        nullable=False)
    comments = db.relationship('Comment', backref='post', lazy=True)
    likes = db.relationship('Like', backref='post', lazy=True)
    notification = db.relationship("Notification", backref="post", lazy=True)


# Category model, handles everything related to a category/talent.
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), unique=True, nullable=False)
    info = db.Column(db.String(300), unique=True, nullable=True)
    bg = db.Column(db.String(300), unique=False, nullable=True)
    image = db.Column(db.String(300), unique=False, nullable=True)
    posts = db.relationship('Post', backref='category', lazy=True)


# Category model, handles everything related to comments
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.String(300), unique=False, nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
        nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'),
        nullable=False)
    notification = db.relationship('Notification', backref='comment', lazy=True)


# Category model, handles everything related to likes/hotshots
class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
        nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'),
        nullable=False)


# Category model, handles everything related to notifications
class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    to_user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
        nullable=False)
    from_user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
        nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'),
        nullable=False)
    content = db.Column(db.String(300), unique=False, nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    opened = db.Column(db.Boolean, nullable=False, default=False)
    comment_id = db.Column(db.Integer, db.ForeignKey('comment.id'),
        nullable=True)


# The follwing api routes are responsible for handling api requests. Request authentication measures are given upon login by giving the logged in user:
# 1- a user token representing his ID. (this will be used to differentiate users)
# 2- a session token which will get bound to the user's database object under the "session_token" column. (unique for every user)
# This means that on every request, we will check the corresponding user object using the ID that the "user_token" is pointing to and compare the session_token that the user making the request has with the session_token that the corresponding user object has. If they match, then the request is validated.


# This is responsible for api requests related to signing up.
# Upon signing up, the password chosen will be stored using bcrypt hashing algorithm. Bcrypt uses a "salt" that is effective against rainbow table attacks and a "cost" which increases the number of iterations of the hash function which makes it time intensive and thus, making offline bruteforce attacks very expensive in terms of resources and time. (The hashing function can be found in global_functions.py)
@app.route("/signup_info_creds", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        user_info = request.get_json()
        decrypted_user_info = {}
        for i in user_info:
            decrypted_user_info[i] = str(aes256.decrypt(user_info[i], "PASSWORD"), "UTF-8")
        if decrypted_user_info["password"] == decrypted_user_info["confirmPassword"]:

            # If the object can't successfully be added, it will throw an error meaning that the username or email is not unique
            try:
                new_user = User(email=decrypted_user_info["email"], name=decrypted_user_info["name"], username=decrypted_user_info["username"], password=hash_password(decrypted_user_info["password"]))
                db.session.add(new_user)
                db.session.commit()
                return jsonify("success")
            except:
                return jsonify("Email or username are already taken.")
        else:
            return "Please make sure that the chosen passwords are similar."
    elif request.method == "GET":
        pass
    return ""

# This is responsible for api requests related to logging in.
@app.route("/login_info_creds", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        user_info = request.get_json()
        decrypted_user_info = {}
        for i in user_info:
            decrypted_user_info[i] = str(aes256.decrypt(user_info[i], "PASSWORD"), "UTF-8")
        database_user = User.query.filter_by(email=decrypted_user_info["email"]).first()
        if database_user:
            loggedIn_password = decrypted_user_info["password"]
            database_password = database_user.password
            if verify_hash(loggedIn_password, database_password):
                user_token = str(aes256.encrypt(str(database_user.id), "PASSWORD"), "UTF-8")
                server_token = str(aes256.encrypt("".join(random.choices(f"1234567890{string.ascii_letters}", k=7)), "PASSWORD"), "UTF-8")
                database_user.status = "Online"
                database_user.session_token = server_token # storing the session_token is the user's object in the db.
                db.session.commit()
                
                # assigning session_token and user_token for logged in users
                return jsonify(status="user verified", user_token=user_token, server_token=server_token)
            else:
                return jsonify(status="Wrong password.")
        elif database_user is None:
            return jsonify(status="Email doesn't exist.")

# This is responsible for api requests related to rendering the feed.
@app.route("/feed", methods=["POST"])
def feed():
    if request.method == "POST":
        request_info = request.get_json()
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        categories = [categ.name for categ in Category.query.all()]
        requested_category_name = request_info["category"]
        database_user = User.query.filter_by(id=int(user_id)).first()

        # Validating by comparing the corresponsing user's stored session_token with the session_token in the request.
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            if requested_category_name in categories:
                requested_category = Category.query.filter_by(name=requested_category_name).first()
                database_user_top_talent = ""
                if len(database_user.posts) > 0:
                    database_user_talents = [i.category.name for i in database_user.posts]
                    database_user_top_talent = max(set(database_user_talents), key=database_user_talents.count)
                category_posts = [{
                    "post_id": post.id,
                    "caption": post.caption, 
                    "media": post.media, 
                    "date_text": pretty_time_difference(post.date, datetime.utcnow()),
                    "date": post.date, 
                    "type": post.type,
                    "user": post.user.username, 
                    "category": post.category.name,
                    "profile_image": post.user.image,
                    "number_of_likes": len(post.likes),
                    "number_of_comments": len(post.comments),
                    "liked_by_user": True if set(database_user.likes) & set(post.likes) else False
                    } for post in requested_category.posts]
                return jsonify(
                    name=database_user.name,
                    username=database_user.username,
                    profile_image= database_user.image,
                    status=database_user.status,
                    top_talent=database_user_top_talent,
                    age = str(database_user.age),
                    gender = database_user.gender,
                    categories=categories,
                    posts=sort_by_method(category_posts, request_info["sort"]),
                    category_profile = {
                        "category_id": requested_category.id,
                        "category_name": requested_category.name,
                        "category_info": requested_category.info,
                        "category_profile_image": requested_category.image,
                        "category_bg": requested_category.bg,
                        "category_number_of_posts": str(len(requested_category.posts)),
                        "category_number_of_hotshots": str(sum([len(i.likes) for i in requested_category.posts]))
                    }
                )
            else:
                return jsonify(
                status="error 404 not found"
            )
        else:
            return jsonify(
                status="error 404 wrong"
            )


# This is responsible for api requests related to rendering the post with its comments.
@app.route("/post_comments", methods=["POST"])
def comment():
    if request.method == "POST":
        request_info = request.get_json()
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        categories = [categ.name for categ in Category.query.all()]
        all_posts = [post.id for post in Post.query.all()]
        requested_post_id = request_info["post_id"]
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            if int(requested_post_id) in all_posts:
                database_user_top_talent = ""
                if len(database_user.posts) > 0:
                    database_user_talents = [i.category.name for i in database_user.posts]
                    database_user_top_talent = max(set(database_user_talents), key=database_user_talents.count)
                requested_post = Post.query.filter_by(id=requested_post_id).first()
                post_comments = [{
                    "id": i.id,
                    "value": i.value,
                    "date_text": pretty_time_difference(i.date, datetime.utcnow()),
                    "date": i.date,
                    "user": i.user.username,
                    "profile_image": i.user.image
                } for i in requested_post.comments]
                author_user = requested_post.user
                author_user_date_joined = f"{author_user.date_joined.strftime('%b')} {author_user.date_joined.day}, {author_user.date_joined.year}"
                author_user_top_talent = ""
                if len(author_user.posts) > 0:
                    author_talents = [i.category.name for i in author_user.posts]
                    author_user_top_talent = max(set(author_talents), key=author_talents.count)
                
                requested_category = requested_post.category

                return jsonify(
                    name=database_user.name,
                    username=database_user.username,
                    userID=database_user.id,
                    status="Online",
                    gender=database_user.gender,
                    age=database_user.age,
                    profile_image= database_user.image,
                    top_talent=database_user_top_talent,
                    categories=categories,
                    post = [{
                        "post_id": requested_post.id,
                        "caption": requested_post.caption, 
                        "media": requested_post.media, 
                        "date_text": pretty_time_difference(requested_post.date, datetime.utcnow()),
                        "date": requested_post.date,
                        "user": requested_post.user.username, 
                        "type": requested_post.type,
                        "category": requested_post.category.name,
                        "comments": sort_latest_to_oldest(post_comments),
                    }],
                    author_profile = {
                        "author_id": author_user.id,
                        "author_profile_image": author_user.image,
                        "author_name": author_user.name,
                        "author_username": author_user.username,
                        "author_number_of_posts": str(len(author_user.posts)),
                        "author_date_joined": author_user_date_joined,
                        "author_top_talent": author_user_top_talent,
                        "author_status": author_user.status,
                        "author_number_of_hotshots": str(sum([len(i.likes) for i in author_user.posts]))
                    },
                    category_profile = {
                        "category_id": requested_category.id,
                        "category_name": requested_category.name,
                        "category_info": requested_category.info,
                        "category_profile_image": requested_category.image,
                        "category_bg": requested_category.bg,
                        "category_number_of_posts": str(len(requested_category.posts)),
                        "category_number_of_hotshots": str(sum([len(i.likes) for i in requested_category.posts]))
                    }
                )
            else:
                return jsonify(
                status="error 404 not found"
            )
        else:
            return jsonify(
                status="error 404 wrong"
            )


# This is responsible for api requests related to submitting a comment.
@app.route("/post_a_comment", methods=["POST"])
def post_a_comment():
    if request.method == "POST":
        request_info = request.get_json()
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        all_posts = [post.id for post in Post.query.all()]
        requested_post_id = request_info["post_id"]
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            if int(requested_post_id) in all_posts:
                comment = request_info["value"]
                notification_body = f"commented on your post:  {comment}"
                to_user_id = Post.query.filter_by(id=requested_post_id).first().user.id
                new_comment = Comment(value=comment, post_id=requested_post_id, user_id=user_id)
                db.session.add(new_comment)
                comment_id = Comment.query.filter_by(value=comment, post_id=requested_post_id, user_id=user_id).order_by(Comment.id).all()[-1].id
                notification = Notification(to_user_id=to_user_id, from_user_id=user_id, post_id=requested_post_id, content=notification_body, comment_id=comment_id)
                db.session.add(notification)
                db.session.commit()
                return jsonify(status="Online")
            else:
                return jsonify(
                status="error 404 not found"
            )
        else:
            return jsonify(
                status="error 404 wrong"
            )

# This is responsible for api requests related to rendering the home page for uploading images.
@app.route("/upload_post", methods=["POST"])
def upload():
    if request.method == "POST":
        request_info = request.get_json()
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        categories = [categ.name for categ in Category.query.all()]
        requested_category = request_info["category"]
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            if requested_category in categories:
                database_user_top_talent = ""
                if len(database_user.posts) > 0:
                    database_user_talents = [i.category.name for i in database_user.posts]
                    database_user_top_talent = max(set(database_user_talents), key=database_user_talents.count)
                return jsonify(
                    name=database_user.name,
                    username=database_user.username,
                    profile_image= database_user.image,
                    status="Online",
                    age=database_user.age,
                    gender=database_user.gender,
                    categories=categories,
                    top_talent=database_user_top_talent,
                )
            else:
                return jsonify(
                status="error 404 not found"
            )
        else:
            return jsonify(
                status="error 404 wrong"
            )
            

# This is responsible for api requests related to logging out.
@app.route("/logout", methods=["POST"]) 
def logout():
    if request.method == "POST":
        request_info = request.get_json()
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():

            # Change the status to offline and remove the session_token stored in db
            database_user.status = "Offline"
            database_user.session_token = ""
            db.session.commit()
            return jsonify(
                status="logout successful"
            )
        else:
            return jsonify(
                status="error 404"
            )

# This is responsible for api requests related to posting images.
@app.route("/upload_a_post", methods=["POST"])
def upload_a_post():
    if request.method == "POST":
        request_info = request.form
        request_image = request.files['imgSrc']
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        categories = [categ.name for categ in Category.query.all()]
        requested_category = request_info["talent"]
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            if requested_category in categories:
                image_name = str("".join(random.choices(f"1234567890{string.ascii_letters}", k=7)))

                # this uploads the image to cloudinary (provides cloud-based image and video management services)
                upload_result_image = cloudinary.uploader.upload(request_image, 
                    resource_type = "auto",
                    folder = "TalentFlex_Dynamic/", 
                    public_id = image_name,
                    overwrite = True, 
                    eager = [
                        {
                            "quality" : 60
                        }
                    ]
                )
                
                print(upload_result_image)
                new_post = Post (
                    caption=request_info['caption'], 
                    category_id=Category.query.filter_by(name=request_info['talent']).first().id,
                    user_id=user_id, 
                    media=upload_result_image["eager"][0]["secure_url"],
                    type=upload_result_image['resource_type']
                )
                db.session.add(new_post)
                db.session.commit()
                time.sleep(7) # sleeping so all the uploading and loading proccesses are cleaned.
                return jsonify(status="Online", post_id=new_post.id, talent=requested_category)
            else:
                return jsonify(
                status="error 404 not found"
            )
        else:
            return jsonify(
                status="error 404 wrong"
            )


# This is responsible for api requests related to liking and disliking.
@app.route("/modify_hotshot", methods=["POST"])
def modify_hotshot():
    if request.method == "POST":
        request_info = request.get_json()
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        all_posts = [post.id for post in Post.query.all()]
        requested_post_id = request_info["post_id"]
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            if int(requested_post_id) in all_posts:
                like_exits = Like.query.filter_by(user_id=user_id, post_id=requested_post_id).first()

                # if the like doesnt exist and the action is "like", create a new like (increases like count)
                if request_info['modify'] == "increase" and not like_exits:
                    to_user_id = Post.query.filter_by(id=requested_post_id).first().user.id
                    notification = Notification(to_user_id=to_user_id, from_user_id=user_id, post_id=requested_post_id, content="liked your post.")
                    new_like = Like(user_id=user_id, post_id=requested_post_id)
                    db.session.add(new_like)
                    db.session.add(notification)
                    db.session.commit()
                    return jsonify (
                        status="increased"
                    )
                
                # here, we will remove the existing comment (dislike) which decreases the like count.
                else:
                    like_to_be_removed = Like.query.filter_by(user_id=user_id, post_id=requested_post_id)
                    like_to_be_removed.delete()
                    db.session.commit()
                    return jsonify (
                        status="decreased"
                    )

            else:
                return jsonify(
                status="error 404 not found"
            )
        else:
            return jsonify(
                status="error 404 wrong"
            )

# This is responsible for api requests related to displaying the feed of a user.
@app.route("/get_user_profile", methods=["POST"])
def get_profile():
    if request.method == "POST":
        request_info = request.get_json()
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        requested_user_username = request_info["user_username"]
        categories = [categ.name for categ in Category.query.all()]
        all_users = [i.username for i in User.query.all()]
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            if requested_user_username in all_users:
                requested_user = User.query.filter_by(username=requested_user_username).first()
                requested_user_date_joined = f"{requested_user.date_joined.strftime('%b')} {requested_user.date_joined.day}, {requested_user.date_joined.year}"
                requested_user_top_talent = ""
                if len(requested_user.posts) > 0:
                    requested_user_talents = [i.category.name for i in requested_user.posts]
                    requested_user_top_talent = max(set(requested_user_talents), key=requested_user_talents.count)
                
                database_user_top_talent = ""
                if len(database_user.posts) > 0:
                    database_user_talents = [i.category.name for i in database_user.posts]
                    database_user_top_talent = max(set(database_user_talents), key=database_user_talents.count)
                requested_user_posts = [{
                    "post_id": post.id,
                    "caption": post.caption, 
                    "media": post.media, 
                    "date": post.date,
                    "date_text": pretty_time_difference(post.date, datetime.utcnow()),
                    "user": post.user.username,
                    "type": post.type,
                    "profile_image": post.user.image,
                    "category": post.category.name,
                    "number_of_likes": len(post.likes),
                    "number_of_comments": len(post.comments),
                    "liked_by_user": True if set(database_user.likes) & set(post.likes) else False
                    } for post in requested_user.posts]
                return jsonify(
                    name=database_user.name,
                    username=database_user.username,
                    profile_image= database_user.image,
                    status=database_user.status,
                    top_talent=database_user_top_talent,
                    categories=categories,
                    age=database_user.age,
                    gender=database_user.gender,
                    posts=sort_by_method(requested_user_posts, request_info["sort"]),
                    author_profile = {
                        "author_id": requested_user.id,
                        "author_profile_image": requested_user.image,
                        "author_name": requested_user.name,
                        "author_username": requested_user.username,
                        "author_number_of_posts": str(len(requested_user.posts)),
                        "author_date_joined": requested_user_date_joined,
                        "author_top_talent": requested_user_top_talent,
                        "author_status": requested_user.status,
                        "author_age": requested_user.age,
                        "author_gender": requested_user.gender,
                        "author_profile_banner": requested_user.banner,
                        "author_number_of_hotshots": str(sum([len(i.likes) for i in requested_user.posts]))
                    }
                )
            else:
                return jsonify(
                status="error 404 not found"
            )
        else:
            return jsonify(
                status="error 404 wrong"
            )

# This is responsible for api requests related to rendering profile popups.
@app.route("/get_profile_popup", methods=["POST"])
def profile_popup():
    if request.method == "POST":
        request_info = request.get_json()
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        all_users = [user.username for user in User.query.all()]
        requested_user_username = request_info["user_username"]
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            if requested_user_username in all_users:
                requested_user = User.query.filter_by(username=requested_user_username).first()
                requested_user_top_talent = ""
                if len(requested_user.posts) > 0:
                    requested_user_talents = [i.category.name for i in requested_user.posts]
                    requested_user_top_talent = max(set(requested_user_talents), key=requested_user_talents.count)
                time.sleep(1)
                return jsonify(
                    status=requested_user.status,
                    name=requested_user.name,
                    age=requested_user.age,
                    gender=requested_user.gender,
                    top_talent=requested_user_top_talent,
                    number_of_hotshots=str(sum([len(i.likes) for i in requested_user.posts]))
                )
            else:
                return jsonify(
                status="error 404 not found"
            )
        else:
            return jsonify(
                status="error 404 wrong"
            )

# This is responsible for api requests related to rendering notifications in notifications popups.
@app.route("/get_notifications", methods=["POST"])
def get_notification():
    if request.method == "POST":
        request_info = request.get_json()
        full = request_info['full']
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        all_users = User.query.all()
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            if database_user in all_users:
                received_notifs = [{
                    "receieved_username": i.to_user.username,
                    "sent_username" : i.from_user.username,
                    "post_image":i.post.media,
                    "user_image": i.from_user.image,
                    "post_id" : i.post.id,
                    "category": i.post.category.name,
                    "comment_id": i.comment_id,
                    "date_text": pretty_time_difference(i.date, datetime.utcnow()), # how old is the notification
                    "date": i.date,
                    "opened": i.opened,
                    "content": i.content if full else pretty_comment(i.content)
                } for i in database_user.recieved_notifs]
                time.sleep(1)
                return jsonify(
                    user_received_notifs=sort_latest_to_oldest(received_notifs),
                    status="Online"
                )
            else:
                return jsonify(
                status="error 404 not found"
            )
        else:
            return jsonify(
                status="error 404 wrong"
            )


# This is responsible for api requests related to rendering the notification home page.
@app.route("/feed_notifications", methods=["POST"])
def feed_notifications():
    if request.method == "POST":
        request_info = request.get_json()
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        categories = [categ.name for categ in Category.query.all()]
        requested_category = request_info["category"]
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            if requested_category in categories:
                database_user_top_talent = ""
                if len(database_user.posts) > 0:
                    database_user_talents = [i.category.name for i in database_user.posts]
                    database_user_top_talent = max(set(database_user_talents), key=database_user_talents.count)
                return jsonify(
                    name=database_user.name,
                    username=database_user.username,
                    profile_image= database_user.image,
                    status="Online",
                    age=database_user.age,
                    gender=database_user.gender,
                    categories=categories,
                    top_talent=database_user_top_talent,
                )
            else:
                return jsonify(
                status="error 404 not found"
            )
        else:
            return jsonify(
                status="error 404 wrong"
            )


# This is responsible for api requests related to clearing notifications
@app.route("/clear_notifications", methods=["POST"])
def clear_notification():
    if request.method == "POST":
        request_info = request.get_json()
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            all_user_notifs = database_user.recieved_notifs

            # this deletes all notifications objects that are appearing on the user's screen.
            if len(all_user_notifs) > 0:
                for i in all_user_notifs:
                    notification = Notification.query.filter_by(id=i.id)
                    notification.delete()
                db.session.commit()
            return jsonify(status="Online")
        else:
            return jsonify(
                status="error 404 wrong"
            )


# This is responsible for api requests related to rendering the home page for settings
@app.route("/settings", methods=["POST"])
def settings():
     if request.method == "POST":
        request_info = request.get_json()
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        categories = [categ.name for categ in Category.query.all()]
        requested_category = request_info["category"]
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            if requested_category in categories:
                database_user_top_talent = ""
                if len(database_user.posts) > 0:
                    database_user_talents = [i.category.name for i in database_user.posts]
                    database_user_top_talent = max(set(database_user_talents), key=database_user_talents.count)
                return jsonify(
                    name=database_user.name,
                    username=database_user.username,
                    profile_image= database_user.image,
                    status="Online",
                    age = database_user.age,
                    gender = database_user.gender,
                    categories=categories,
                    top_talent=database_user_top_talent,
                )
            else:
                return jsonify(
                status="error 404 not found"
            )
        else:
            return jsonify(
                status="error 404 wrong"
            )
            

# This is responsible for api requests related to rendering settings/profile page.
@app.route("/get_settings_profile", methods=["POST"])
def get_settings_profile():
    if request.method == "POST":
        request_info = request.get_json()
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            time.sleep(1)
            return jsonify(
                name=database_user.name,
                profile_image= database_user.image,
                age = database_user.age,
                gender = database_user.gender,
                about = database_user.about,
                banner_image = database_user.banner
            )
        else:
            return jsonify(
            status="error 404 not found"
        )

# This is responsible for api requests related to editing the profile of the user (profile image, name, about, age ....)
@app.route("/edit_settings_profile", methods=["POST"])
def edit_settings_profile():
    if request.method == "POST":
        request_info = request.form
        if request.files:
            if "imgSrc" in request.files:
                request_profile_image = request.files["imgSrc"]
            if "img2Src" in request.files:
                request_banner_image = request.files["img2Src"]
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            

            if "imgSrc" in request.files:
                profile_image_name = str("".join(random.choices(f"1234567890{string.ascii_letters}", k=7)))
                upload_result_profile_image = cloudinary.uploader.upload(request_profile_image, 
                    folder = "TalentFlex_Dynamic/", 
                    public_id = profile_image_name,
                    overwrite = True,
                    eager = [
                        {
                            "quality" : 60
                        }
                    ] 
                )
                
                database_user.image = upload_result_profile_image["eager"][0]["secure_url"]

            if "img2Src" in request.files:
                banner_image_name = str("".join(random.choices(f"1234567890{string.ascii_letters}", k=7)))
                upload_result_banner_image = cloudinary.uploader.upload(request_banner_image, 
                    folder = "TalentFlex_Dynamic/", 
                    public_id = banner_image_name,
                    overwrite = True, 
                    eager = [
                        {
                            "quality" : 60
                        }
                    ]
                )

                database_user.banner = upload_result_banner_image["eager"][0]["secure_url"]


            database_user.age = request_info["age"]
            database_user.gender = request_info["gender"]
            database_user.name = request_info["name"]
            database_user.about = request_info["about"]
            
            db.session.commit()
            time.sleep(2)
            return jsonify(
                status="success"
            )
        else:
            return jsonify(
            status="error 404 not found"
        )

# This is responsible for api requests related to rendering settings/account page.
@app.route("/get_settings_account", methods=["POST"])
def get_settings_account():
    if request.method == "POST":
        request_info = request.get_json()
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            time.sleep(1)
            return jsonify(
                username=database_user.username,
                email=database_user.email
            )
        else:
            return jsonify(
            status="error 404 not found"
        )


# This is responsible for api requests related to editing the account credentials of the user (password and email)
@app.route("/edit_settings_account", methods=["POST"])
def edit_settings_account():
    if request.method == "POST":
        request_info = request.get_json()
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            
            if verify_hash(request_info["confirmChangesPassword"], database_user.password):
                database_user.email = request_info["email"]

                if request_info["password"] or request_info["confirmPassword"]:
                    if request_info["password"] == request_info["confirmPassword"]:
                        database_user.password = hash_password(request_info["confirmPassword"])
                    else:
                        time.sleep(2)
                        return jsonify (
                            status="not matching"
                        )
            else:
                time.sleep(2)
                return jsonify(
                    status="wrong old password"
                )

            time.sleep(2)
            db.session.commit()
            return jsonify(
                status="success"
            )
        else:
            return jsonify(
            status="error 404 not found"
        )


# This is responsible for api requests related to displaying the search results of a specific search.
@app.route("/search", methods=["POST"])
def search():
    if request.method == "POST":
        request_info = request.get_json()
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            search_string = request_info["search_string"]
            all_users = User.query.all()
            if search_string[0:2] == "u/":
                matched = [{"username": i.username, "name": i.name, "profile_image": i.image} for i in search_username(search_string[2:], all_users)]
            else:
                matched = [{"name" : i.name, "username" : i.username, "profile_image" : i.image} for i in search_name(search_string, all_users)]
            time.sleep(1)
            return jsonify(result=matched)
            

# This is responsible for api requests related to rendering search home page. (accessed when there are many search results)
@app.route("/feed_search", methods=["POST"])
def feed_search() :
    if request.method == "POST":
        request_info = request.get_json()
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        categories = [categ.name for categ in Category.query.all()]
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            database_user_top_talent = ""
            if len(database_user.posts) > 0:
                database_user_talents = [i.category.name for i in database_user.posts]
                database_user_top_talent = max(set(database_user_talents), key=database_user_talents.count)
            return jsonify(
                name=database_user.name,
                username=database_user.username,
                profile_image= database_user.image,
                status="Online",
                age=database_user.age,
                gender=database_user.gender,
                categories=categories,
                top_talent=database_user_top_talent,
            )
        else:
            return jsonify(
                status="error 404 wrong"
            )


# This is responsible for api requests related to rendering the chat home page.
@app.route("/chat_1", methods=["POST"])
def chat():
     if request.method == "POST":
        request_info = request.get_json()
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        categories = [categ.name for categ in Category.query.all()]
        requested_category = request_info["category"]
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            if requested_category in categories:
                database_user_top_talent = ""
                if len(database_user.posts) > 0:
                    database_user_talents = [i.category.name for i in database_user.posts]
                    database_user_top_talent = max(set(database_user_talents), key=database_user_talents.count)
                return jsonify(
                    name=database_user.name,
                    username=database_user.username,
                    profile_image= database_user.image,
                    status="Online",
                    age = database_user.age,
                    gender = database_user.gender,
                    categories=categories,
                    top_talent=database_user_top_talent,
                )
            else:
                return jsonify(
                status="error 404 not found"
            )
        else:
            return jsonify(
                status="error 404 wrong"
            )


# This is responsible for api requests related to rendering the creds (profile image, name and username) of the user you're texting with.
@app.route("/chat_creds", methods=["POST"])
def get_chat_creds() :
    if request.method == "POST":
        request_info = request.get_json()
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        requested_username = request_info["username"]
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            requested_user = User.query.filter_by(username=requested_username).first()
            return jsonify(
                name=requested_user.name,
                username=requested_user.username,
                profile_image= requested_user.image,
                status=requested_user.status,
            )
        else:
            return jsonify(
                status="error 404 wrong"
            )


# This is responsible for api requests related to rendering the creds (profile image, name and username) of all the users in the chat list (users you have texted before)
@app.route("/chat_list_creds", methods=["POST"])
def get_chat_list_creds() :
    if request.method == "POST":
        request_info = request.get_json()
        user_id = str(aes256.decrypt(request_info["user_token"], "PASSWORD"), "UTF-8")
        requested_usernames = request_info["chatList"]
        database_user = User.query.filter_by(id=int(user_id)).first()
        if request_info["server_token"] == database_user.session_token and user_id.isnumeric():
            requested_usernames_objects = [User.query.filter_by(username=i).first() for i in requested_usernames]

            creds = [
                {"name": i.name,
                "username": i.username,
                "profile_image": i.image
                } 
                for i in requested_usernames_objects]

            return jsonify(
                status="Online",
                chatList_creds=creds               
            )
        else:
            return jsonify(
                status="error 404 wrong"
            )

# This root endpoint is going to point to the built version of the ReactJS code where we will call the endpoints and show the results in a web browser.
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.errorhandler(404)
def serve_2(e):
    if request.method == 'GET':
        return send_from_directory(app.static_folder, 'index.html')




if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=False, port=os.environ.get('PORT', 80))