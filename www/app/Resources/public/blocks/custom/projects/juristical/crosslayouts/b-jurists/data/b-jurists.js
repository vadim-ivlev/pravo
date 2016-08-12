module.exports = {
    "list": { // В списке на строанице юристов
        "object": "jurists_list",
        "name": "",
        "img__width": 100,
        "img__height": 100,
        "showBlocks": {
            "img": true,
            "patronymic": true,
            "education": true,
            "specialization": true,
            "company": true,
            "rate": true,
            "consultations": true
        }
    },
    "feed": { // В блоке "Предлагаю услуги"
        "object": "jurists_feed",
        "name": "Предлагаю помощь",
        "img__width": 55,
        "img__height": 55,
        "showBlocks": {
            "img": true,
            "patronymic": true,
            "education": true,
            "specialization": true
        }
    },
    "top": { // В блоке "Лучшие за неделю"
        "object": "jurists_top",
        "name": "Лучшие за неделю",
        "img__width": 55,
        "img__height": 55,
        "showBlocks": {
            "img": true,
            "consultations": true
        }
    },
    "profile": { // В профиле юриста
        "object": "jurists_profile",
        "name": "",
        "img__width": 140,
        "img__height": 140,
        "showBlocks": {
            "img": true,
            "patronymic": true,
            "education": true,
            "specialization": true,
            "company": true,
            "bio": true,
            "rate": true,
            "consultations": true
        }
    }
};