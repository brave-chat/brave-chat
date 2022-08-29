import datetime

from app.models import BlackListedTokens, User


async def deactivate_user(currentUser: User):
    user = await User.find(User.email == currentUser.email).all()
    user.user_status = "9"
    return await user.save()


async def set_black_list(user_pk: str, token: str):
    black_listed_token = await BlackListedTokens.find(
        BlackListedTokens.user == user_pk
    ).all()
    if not black_listed_token:
        return await BlackListedTokens(user=user_pk, tokens=[token]).save()
    black_listed_token = black_listed_token[0]
    if token not in black_listed_token.tokens:
        black_listed_token.tokens.insert(0, token)
        black_listed_token.modified_date = datetime.datetime.utcnow()
        return await black_listed_token.save()
    return black_listed_token
