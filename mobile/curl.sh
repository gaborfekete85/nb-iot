curl -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYTI0YWE5OS1jY2Q3LTRiY2ItYTZmMS00NTUwOTRmMzc4OGYifQ.qMwuWmSeFJG8aFcBjVaExj101MkL-NDQABgCmPJ7UqI" -H "Content-Type: application/json" -d '{
    "tokens": ["d178z9cSGoo:APA91bHsQMZxL2QM5vWTNVP0ASFAAlqZGPVOJAAFPIImCNgmgC4aAmw1qu-VkANEC6MvdXtmQ9HhYzOX3xuoHw_z2mttQyosVZ-MdPsxZjBVIuuQueIYd6UaGUuu9b3ZoZnQdryZhgBV"],
    "profile": "dev",
    "notification": {
        "message": "This is my demo push!"
    }
}' "https://api.ionic.io/push/notifications"
