describe('Покупка аватара на pokemonbattle.ru', function(){

    it('Покупка аватара', function(){
        // Заходим на сайт
        cy.visit('https://pokemonbattle.ru');
        // Вводим логин
        cy.get('#k_email').type('User_Login');
        // Вводим пароль
        cy.get('#k_password').type('User_Password');
        // Нажимаем на кнопку войти
        cy.get('#root > div > div > section > div.style_1_popup_white_in.style_1_popup_white_in_auth > form > button').click();
        cy.wait(1000);
        // Нажимаем на профиль
        cy.get('#root > div > header > nav > div.right_block > a.header_card_trainer.style_1_interactive_button_link').click();
        cy.wait(1000);
        // Нажимаем на "Смена аватара"
        cy.get('#root > div > div > div > div.single_page_body_content > div.single_page_body_content_inner > div.k_mobile.k_content_trainer > div:nth-child(5) > div > div').click();
        cy.wait(1000);
        // Нажимаем на кнопку купить среди доступных аватарок
        cy.get('#root > div > div > main > section.shop > ul > li.available > button').first().click();
        // Вводим номер карты
        cy.get('#root > div > div > main > form > div > div:nth-child(2) > input').type('4111111111111111');
        cy.wait(500);
        // Вводим дату истечения карты
        cy.get('#root > div > div > main > form > div > div.payment_form_card_form_inputs > div:nth-child(1) > input').type('1230');
        cy.wait(500);
        // Вводим CVV код
        cy.get('#root > div > div > main > form > div > div.payment_form_card_form_inputs > div:nth-child(2) > input').type('125');
        cy.wait(500);
        // Вводим имя носителя карты
        cy.get('#root > div > div > main > form > div > div.payment_form_card_form_input.payment_form_card_form_input_last > input').type('John Cina');
        cy.wait(500);
        // Нажимаем на кнопку "Оплатить"
        cy.get('#root > div > div > main > form > div > div.style_1_base_button_payment_body > button').click();
        // Вводим код из пуша или из СМС
        cy.get('#root > div > div > main > form > div > div.payment_form_card_form_input > input').type('56456');
        // Нажимаем на кнопку "Оплатить"
        cy.get('#root > div > div > main > form > div > div.style_1_base_button_payment_body > button').click();
        // Проверка, что оплата произведена успешно
        cy.get('#root > div > div > main > form > div > div > h3').contains('Покупка прошла успешно').should('be.visible');
    })
})

