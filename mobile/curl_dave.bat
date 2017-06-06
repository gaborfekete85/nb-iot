curl.exe -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYTI0YWE5OS1jY2Q3LTRiY2ItYTZmMS00NTUwOTRmMzc4OGYifQ.qMwuWmSeFJG8aFcBjVaExj101MkL-NDQABgCmPJ7UqI" -H "Content-Type: application/json" -d '{
    "tokens": ["flA2BvQ0tHw:APA91bHTWSOSDaCtGgMuoemZJlMFghWoP2OkUJUOkKLwjf1eYrUvAU7ANEbLH0Bk8N2rKdsYvtHPKZhIMDVZ_mzhdlLdqzrgHCPCU1cQ_N7xINeIWcMZv9V5ZLqxHaBTSj7QI0EKFZ3q","d178z9cSGoo:APA91bHsQMZxL2QM5vWTNVP0ASFAAlqZGPVOJAAFPIImCNgmgC4aAmw1qu-VkANEC6MvdXtmQ9HhYzOX3xuoHw_z2mttQyosVZ-MdPsxZjBVIuuQueIYd6UaGUuu9b3ZoZnQdryZhgBV"],
    "profile": "dev",
    "notification": {
        "message": "Hello Hallo elektrokalandor !"
    }
}' "https://api.ionic.io/push/notifications"
