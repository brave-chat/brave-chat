import datetime
import logging

from app.auth.crud import find_existed_user
from app.models import Contact, Conversation, User
from app.users.schemas import UserObjectSchema

logger = logging.getLogger(__name__)


async def create_new_contact(contact: str, user_pk: str):
    contact = await find_existed_user(email=contact)
    if not contact:
        return {
            "status_code": 400,
            "message": "You can't add a non existing user to"
            " your contact list!",
        }
    elif contact.pk == user_pk:
        return {
            "status_code": 400,
            "message": "You can't add yourself to your contact list!",
        }
    found_contact = await Contact.find(
        Contact.user == user_pk, Contact.contacts << contact.pk
    ).all()
    if found_contact:
        return {
            "status_code": 400,
            "message": f"{contact.first_name} already exist in your"
            " contact list!",
        }
    users = await Contact.find(Contact.user == user_pk).all()
    if users:
        user = users[0]
    else:
        user = await Contact(user=user_pk, contacts=[contact.pk]).save()
    if user.contacts:
        user.contacts.insert(0, contact.pk)
        user.modified_date = datetime.datetime.utcnow()
        await user.save()
    results = {
        "status_code": 201,
        "message": f"{contact.first_name} has been added to your contact"
        " list!",
    }
    return results


async def get_contacts():
    # can't do aggregation with redis-om, group by users.
    contacts = await Contact.find().all()
    results = []
    for contact in contacts:
        users = await User.find(User.pk == contact.user).all()
        if not users:
            continue
        user = users[0]
        contact.user = user.email
        contact.contacts = await User.find(User.pk << contact.contacts).all()
        results.append(contact)
    results = {
        "status_code": 200,
        "result": results,
    }
    return results


async def get_user_contacts(user_pk: str):
    contacts = await Contact.find(Contact.user == user_pk).all()
    if contacts:
        contact = contacts[0]
        contacts = await User.find(User.pk << contact.contacts).all()
        results = {"status_code": 200, "result": contacts}
        return results
    return {"status_code": 400, "message": "User not found!"}


async def get_user_contacts_chat(user_pk: str):
    # return users that have chats
    contacts = await Contact.find(Contact.user == user_pk).all()
    if contacts:
        contact = contacts[0]
        contacts_pk = contact.contacts
        conversations_sent = await Conversation.find(
            Conversation.sender == user_pk,
            Conversation.receiver << contacts_pk,
        ).all()
        conversations_received = await Conversation.find(
            Conversation.sender << contacts_pk,
            Conversation.receiver == user_pk,
        ).all()
        # extract all the receivers_pk:
        senders_pk = []
        receivers_pk = []
        contacts_results = []
        if conversations_sent:
            receivers_pk = list(
                map(
                    lambda conversation: conversation.receiver,
                    conversations_sent,
                )
            )
            if receivers_pk:
                contacts_results.extend(
                    await User.find(User.pk << receivers_pk).all()
                )
        if conversations_received:
            senders_pk = list(
                map(
                    lambda conversation: conversation.sender,
                    conversations_received,
                )
            )
            senders_pk = list(set(senders_pk) - set(receivers_pk))
            if senders_pk:
                contacts_results.extend(
                    await User.find(User.pk << senders_pk).all()
                )
        return {"status_code": 200, "result": contacts_results}
    return {"status_code": 400, "message": "User not found!"}


async def search_user_contacts_chat(search: str, user_pk: str):
    search = search.lower()
    results = await get_user_contacts_chat(user_pk)
    if results.get("result"):
        results = results["result"]
        return_results = []
        for user in results:
            if (
                search in user.first_name.lower()
                or search in user.last_name.lower()
            ):
                return_results.append(user)
        results = {"status_code": 200, "result": return_results}
        return results
    return {"status_code": 400, "message": "User not found!"}


async def search_user_contacts(search: str, user_pk: str):
    search = search.lower()
    results = await get_user_contacts(user_pk)
    if results.get("result"):
        results = results["result"]
        return_results = []
        for user in results:
            if (
                search in user.first_name.lower()
                or search in user.last_name.lower()
            ):
                return_results.append(user)
        results = {"status_code": 200, "result": return_results}
        return results
    return {"status_code": 400, "message": "User not found!"}
