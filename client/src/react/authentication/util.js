export const USERNAME_LENGTH_MIN = 4

export const PASSWORD_LENGTH_MIN = 8

export const PASSWORD_DIGITS_MIN = 1

export const PASSWORDS_BLACKLIST = ['Passw0rd', 'Password123']

export const PASSWORD_VALIDATION_MESSAGES = {
    "min": "Password is too short, al least " + PASSWORD_LENGTH_MIN + " characters needed.\n",
    "digits": "At least " + PASSWORD_DIGITS_MIN + " number is needed.\n",
    "uppercase": "There are no uppercase letters, at least 1 is needed.\n",
    "lowercase": "There are no lowercase letters, at least 1 is needed.\n",
    "oneOf": "Your password is too simple, please change it!.\n",
}
