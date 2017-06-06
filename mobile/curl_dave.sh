curl -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYTI0YWE5OS1jY2Q3LTRiY2ItYTZmMS00NTUwOTRmMzc4OGYifQ.qMwuWmSeFJG8aFcBjVaExj101MkL-NDQABgCmPJ7UqI" -H "Content-Type: application/json" -d '{
    "tokens": ["cL6fwbGiiYU:APA91bEH-kcbKt9OdsZTmL7A-CDUfNVkeC0KT_Fukhf36BE2Yo-IS5D3NAJ-Wdl31vzVmznHDRAa7RmkV1XL4coSW1DotI06xvy3iMvROEqPv9tPqyeOKjQUSQRgQeP69PIIPYY9oXiB","feba7KFhspI:APA91bEtpT8Dq2nthohA4In-qbHci7DHyQLZEtLTcZzPk7TYGXO_iNShVF0TXpuq0G145iGYPwPwwlQPmEeuKgc3oF9NKR8jJSzFUiNqImMojPGjEYvrK0UxOvyMPJcihhJOYcJkmmvq"],
    "profile": "dev",
    "notification": {
        "message": "This is my demo push!"
    }
}' "https://api.ionic.io/push/notifications"
