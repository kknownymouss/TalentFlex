import random
from Cryptodome.Protocol.KDF import bcrypt, bcrypt_check
from Cryptodome.Hash import SHA256
from base64 import b64encode
from Cryptodome.Random import get_random_bytes

# Global functions for backend simplicity


# Returns the time difference between two datetime objects in a pretty format
def pretty_time_difference(intial, current):
    time_diff = current - intial
    if time_diff.days > 0: # Deal with years, months, weeks, days difference
        if time_diff.days > 365:
            time_diff = time_diff.days // 365
            return f"{time_diff} years ago" if time_diff > 1 else f"{time_diff} year ago"
        elif time_diff.days > 30:
            time_diff = time_diff.days // 30
            return f"{time_diff} months ago" if time_diff > 1 else f"{time_diff} month ago"
        elif time_diff.days > 7:
            time_diff = time_diff.days // 7
            return f"{time_diff} weeks ago" if time_diff > 1 else f"{time_diff} week ago"
        elif time_diff.days > 0:
            time_diff = time_diff.days
            return f"{time_diff} days ago" if time_diff > 1 else f"{time_diff} day ago"
    else: # Deal with hours, minutes, seconds difference.
        if time_diff.seconds > 3600:
            time_diff = time_diff.seconds // 3600
            return f"{time_diff} hours ago" if time_diff > 1 else f"{time_diff} hour ago"
        elif time_diff.seconds > 60:
            time_diff = time_diff.seconds // 60
            return f"{time_diff} minutes ago" if time_diff > 1 else f"{time_diff} minute ago"
        elif time_diff.seconds > 0:
            time_diff = time_diff.seconds
            return f"{time_diff} seconds ago" if time_diff > 1 else f"{time_diff} second ago"
    return "now"


# Sorts a list of model objects by date from latest to oldest
def sort_latest_to_oldest(objects_list):
    sorted_list = sorted(objects_list, reverse=True, key=lambda x : x['date'])
    return sorted_list


# Sorts a list of model objects by date from oldest to latest
def sort_oldest_to_latest(objects_list):
    sorted_list = sorted(objects_list, key=lambda x : x['date'])
    return sorted_list


# Sorts a list of model objects by hotshots count
def sort_by_hotshots(objects_list):
    sorted_list = sorted(objects_list, reverse=True, key=lambda x : x['number_of_likes'])
    return sorted_list


# Sorts a list of model objects randomly
def sort_by_random(objects_list):
    objects_list_shallow_copy = objects_list.copy()
    random.shuffle(objects_list_shallow_copy)
    return objects_list_shallow_copy


# Sorts a list of model objects by a trending algorithm
def sort_by_trending(objects_list):
    def filtering_trending_posts(post):
        if post['number_of_likes'] >= 3:
            return True
    objects_list_shallow_copy = objects_list.copy()
    filtered_objects_list = list(filter(filtering_trending_posts, objects_list_shallow_copy))
    random.shuffle(filtered_objects_list)
    return filtered_objects_list



# Sort a list using the specified sorting type
def sort_by_method(objects_list, sorting_type):
    if sorting_type == "New":
        return sort_latest_to_oldest(objects_list)
    elif sorting_type == "Top":
        return sort_by_hotshots(objects_list)
    elif sorting_type == "Random":
        return sort_by_random(objects_list)
    elif sorting_type == "Trending":
        return sort_by_trending(objects_list)


# Trims a comment and limits it to 40 chars
def pretty_comment(comment) :
    if len(comment) > 40:
        return f"{comment[:40]}..."
    elif len(comment) < 40:
        return f"{comment}"


# Apply search algorithm and return matching usernames
def search_username(requested_username, usernames_list):
    def filtering_usernames(username):
        if requested_username == username.username[0: len(requested_username)] and requested_username:
            return True
    return list(filter(filtering_usernames, usernames_list))


# Apply search algorithm and return matching names
def search_name(requested_name, names_list):
    def filtering_names(name):
        if requested_name == name.name[0: len(requested_name)] and requested_name:
            return True
    return list(filter(filtering_names, names_list))


# hash the password using bcrypt algorithm
def hash_password(pwd: str):
    b_pwd: bytes = bytes(pwd, "utf-8")
    b_salt = get_random_bytes(16)
    b64_sha256_pwd: bytes = b64encode(SHA256.new(b_pwd).digest())
    bcrypt_hash: bytes = bcrypt(b64_sha256_pwd, 12, b_salt)
    return bcrypt_hash


# verifies if the given password bcrypt hash matches the stored bcrypt hash
def verify_hash(pwd: str, bcrypt_hash: bytes):
    b_pwd: bytes = bytes(pwd, "utf-8")
    b64_sha256_pwd: bytes = b64encode(SHA256.new(b_pwd).digest())
    try:
        bcrypt_check(b64_sha256_pwd, bcrypt_hash)  
        return True
    except ValueError:
        return False