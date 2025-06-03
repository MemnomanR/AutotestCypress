import * as data from "../helpers/default_data.json"

describe('Автотесты login.qa.studio', function () {
    
    beforeEach('Начало теста', function () {
        // Заходим на сайт
        cy.visit('/');
    })

    afterEach('Конец теста', function(){
        // Сообщение об успехе/ошибке видно пользователю
        cy.get('#messageHeader').should('be.visible');
        cy.get('#exitMessageButton > img').should('be.visible');
    })

    it('Верный логин и пароль', function () {
        // Находим импуты и вбиваем верные логин и пароль
        cy.get('#mail').type(data.login);
        cy.get('#pass').type(data.password);
        // Кликаем на кнопку входа
        cy.get('#loginButton').click();
        // Проверка, что авторизация прошла
        cy.get('#messageHeader').contains('Авторизация прошла успешно');
    })

    it('Проверка логики восстановления пароля', function () {
        // Находим ссылку "Забыли пароль?" и кликаем на неё
        cy.get('#forgotEmailButton').click();
        // Находим импут и вбиваем верный логин для восстановления пароля
        cy.get('#mailForgot').type(data.login);
        // Находим кнопку "Отправить код" и кликаем на неё
        cy.get('#restoreEmailButton').click();
        // Проверка, что код отправлен успешно
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail')
    })

    it('Верный логин и НЕверный пароль', function () {
        // Находим импут и вбиваем верный логин
        cy.get('#mail').type(data.login);
        // Находим импут и вбиваем НЕверный логин
        cy.get('#pass').type('invalid_password');
        // Кликаем на кнопку входа
        cy.get('#loginButton').click();
        // Проверка, что вылезла ошибка авторизации
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
    })

    it('НЕверный логин и верный пароль', function () {
        // Находим импут и вбиваем НЕверный логин
        cy.get('#mail').type('invalidLogin@dolnikov.ru');
        // Находим импут и вбиваем верный логин
        cy.get('#pass').type(data.password);
        // Кликаем на кнопку входа
        cy.get('#loginButton').click();
        // Проверка, что вылезла ошибка авторизации
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
    })

    it('Ошибка валидации логина', function () {
        // Находим импуты и через type вбиваем неверный логин и верный пароль
        cy.get('#mail').type('germandolnikov.ru');
        cy.get('#pass').type(data.password);
        // Кликаем на кнопку входа
        cy.get('#loginButton').click();
        // Проверка, что вылезла ошибка валидации
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
    })

    it('Проверка приведения прописных букв к строчным', function () {
        // Находим импуты и через type вбиваем логин с прописными буквами и верный пароль
        cy.get('#mail').type('GerMan@dolnikov.ru');
        cy.get('#pass').type(data.password);
        // Кликаем на кнопку входа
        cy.get('#loginButton').click();
        // Проверка, что авторизация прошла
        cy.get('#messageHeader').contains('Авторизация прошла успешно');
    })    
})
