CREATE DATABASE  shoes_factory_db
USE shoes_factory_db

-- DROP  DATABASE shoes_factory_db
SHOW FULL TABLES
SHOW PROCEDURE STATUS WHERE db = 'shoes_factory_db';



SELECT * FROM users
-- Таблица хранит информацию о ролях пользователей в системе
CREATE TABLE roles (
    role_id INT  AUTO_INCREMENT,  -- Уникальный идентификатор роли
    title VARCHAR(50) NOT NULL,  -- Название роли (например, 'Admin', 'Manager')
    description VARCHAR(255) NULL,  -- Описание роли (по желанию)
    CONSTRAINT pk_roles_role_id PRIMARY KEY(role_id),
    CONSTRAINT uq_roles_title UNIQUE(title)
);

SELECT * FROM Products
SELECT * FROM Suppliers
-- Процедуры
DELIMITER //
-- Добавление новой роли
CREATE PROCEDURE add_role(IN p_title VARCHAR(50), IN p_description VARCHAR(255))
BEGIN
    INSERT INTO roles (title, description) VALUES (p_title, p_description);
END  //

DELIMITER //
-- Получение информации о роли по ID
CREATE PROCEDURE get_role_by_id(IN p_role_id INT)
BEGIN
    SELECT * FROM roles WHERE role_id = p_role_id;
END //

DELIMITER //
-- Получение всех ролей
CREATE PROCEDURE get_all_roles()
BEGIN
    SELECT * FROM roles;
END //

DELIMITER //
-- Обновление информации о роли
CREATE PROCEDURE update_role(
    IN p_role_id INT, 
    IN p_title VARCHAR(50), 
    IN p_description VARCHAR(255)
)
BEGIN
    UPDATE roles 
    SET title = p_title, description = p_description 
    WHERE role_id = p_role_id;
END //

DELIMITER //
-- Удаление роли
CREATE PROCEDURE delete_role(IN p_role_id INT)
BEGIN
    DELETE FROM roles WHERE role_id = p_role_id;
END //

DELIMITER //
-- Поиск роли по названию
CREATE PROCEDURE get_role_by_title(IN p_title VARCHAR(50))
BEGIN
    SELECT * FROM roles WHERE title = p_title;
END //


-- Таблица хранит информацию о пользователях системы
CREATE TABLE users (
    user_id INT AUTO_INCREMENT,  -- Уникальный идентификатор пользователя
    role_id INT NOT NULL,  -- Идентификатор роли пользователя
    login VARCHAR(50)  NOT NULL,  -- Логин пользователя
    password_hash VARCHAR(255) NOT NULL,  -- Пароль пользователя
    phone VARCHAR(12)  NULL,
    email VARCHAR(100)   NULL,  -- Электронная почта пользователя
    registration_date DATETIME DEFAULT NOW(),  -- Дата регистрации пользователя
    status VARCHAR(20)  NOT NULL DEFAULT 'Активен',  -- Статус пользователя
    CONSTRAINT pk_users_user_id PRIMARY KEY(user_id),
    CONSTRAINT fk_users_roles FOREIGN KEY (role_id) REFERENCES roles(role_id), -- Внешний ключ, ссылающийся на таблицу Roles
    CONSTRAINT uq_users_phone UNIQUE(phone),
	CONSTRAINT uq_users_login UNIQUE(login),
    CONSTRAINT uq_users_email UNIQUE(email),
    CONSTRAINT ck_users_email CHECK (email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),  -- Проверка формата email
	CONSTRAINT ck_users_phone CHECK (phone REGEXP '^\\+7\\d{10}$'),  -- Проверка формата телефона (начинается с +7 и состоит из 10 цифр)
    CONSTRAINT ck_users_status CHECK (status IN ('Активен', 'Заблокирован', 'Удален'))
);

-- Получить по статусу
DELIMITER //
CREATE PROCEDURE get_users_by_status(IN p_status VARCHAR(20))
BEGIN
	SELECT * FROM users 
    WHERE status = p_status;
END //




SELECT * FROM roles;
SELECT * FROM users

DELIMITER //
-- Добавление нового пользователя
CREATE PROCEDURE add_user(
    IN p_role_id INT,
    IN p_login VARCHAR(50),
    IN p_password_hash VARCHAR(255),
    IN p_phone VARCHAR(12),
    IN p_email VARCHAR(100),
    IN p_status VARCHAR(20)
)
BEGIN
    INSERT INTO users (role_id, login, password_hash, phone, email, status) 
    VALUES (p_role_id, p_login, p_password_hash, p_phone, p_email, p_status);
END //

DELIMITER //
-- Получение информации о пользователе по ID
CREATE PROCEDURE get_user_by_id(IN p_user_id INT)
BEGIN
    SELECT * FROM users WHERE user_id = p_user_id;
END //

DELIMITER //
-- Получение всех пользователей
CREATE PROCEDURE get_all_users()
BEGIN
    SELECT * FROM users;
END //

DELIMITER //
-- Поиск пользователя по email
CREATE PROCEDURE get_user_by_email(IN p_email VARCHAR(100))
BEGIN
    SELECT * FROM users WHERE email = p_email;
END //


DELIMITER //
-- Поиск пользователя по login
DELIMITER //
CREATE PROCEDURE get_user_by_login(IN p_login VARCHAR(255))
BEGIN
    SELECT u.user_id, u.login, u.status, u.email, u.phone,u.registration_date,  u.password_hash, r.role_id, r.title,
    r.description
    FROM users u
    JOIN roles r ON u.role_id = r.role_id
    WHERE u.login = p_login;
END //

DELIMITER ;

DELIMITER //

-- Обновление информации о пользователе
CREATE PROCEDURE update_user(
    IN p_user_id INT,
    IN p_role_id INT,
    IN p_login VARCHAR(50),
    IN p_password_hash VARCHAR(255),
    IN p_phone VARCHAR(12),
    IN p_email VARCHAR(100),
    IN p_status VARCHAR(20)
)
BEGIN
    UPDATE users 
    SET role_id = p_role_id, login = p_login, password_hash = p_password_hash, 
        phone = p_phone, email = p_email, status = p_status
    WHERE user_id = p_user_id;
END //

-- Удаление пользователя
CREATE PROCEDURE delete_user(IN p_user_id INT)
BEGIN
    DELETE FROM users WHERE user_id = p_user_id;
END //

-- Изменение пароля пользователя
CREATE PROCEDURE update_user_password(
    IN p_user_id INT,
    IN p_new_password_hash VARCHAR(255)
)
BEGIN
    UPDATE users 
    SET password_hash = p_new_password_hash
    WHERE user_id = p_user_id;
END //

DELIMITER ;



-- Таблица хранит информацию о сотрудниках компании
CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT,  -- Уникальный идентификатор сотрудника
    last_name VARCHAR(100) NOT NULL,  -- Фамилия сотрудника
    first_name VARCHAR(100) NOT NULL,  -- Имя сотрудника
    middle_name VARCHAR(100) NULL,  -- Отчество сотрудника
    date_of_birth DATE NOT NULL,  -- Дата рождения сотрудника (необязательно)
    phone VARCHAR(12) NOT NULL, 
    email VARCHAR(100) NOT NULL,  -- Электронная почта сотрудника (необязательно)
    hire_date DATE NOT NULL,  -- Дата принятия на работу
    dismissal_date DATE NULL,
    passport_series VARCHAR(4) NOT NULL,
    passport_number VARCHAR(6) NOT NULL,
    position VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Работает',  -- Статус сотрудника
    CONSTRAINT pk_employee_id PRIMARY KEY(employee_id),
    CONSTRAINT uq_employees_passport UNIQUE(passport_series,passport_number),
	CONSTRAINT uq_employees_phone UNIQUE(phone),
	CONSTRAINT uq_employees_email UNIQUE(email),
	CONSTRAINT ck_employees_first_name CHECK (first_name REGEXP '^[a-zA-Zа-яА-ЯёЁ_\\- ]+$'),
    CONSTRAINT ck_employees_last_name CHECK (last_name REGEXP '^[a-zA-Zа-яА-ЯёЁ_\\- ]+$'),
	CONSTRAINT ck_employees_middle_name CHECK (middle_name REGEXP '^[a-zA-Zа-яА-ЯёЁ_\\- ]+$'),
    CONSTRAINT ck_employees_email CHECK (email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),  -- Проверка формата email
	CONSTRAINT ck_employees_phone CHECK (phone REGEXP '^\\+7\\d{10}$') , -- Проверка формата телефона (начинается с +7 и состоит из 10 цифр)
	CONSTRAINT ck_employees_hire_before_dismissal CHECK (dismissal_date IS NULL OR hire_date <= dismissal_date),  -- Дата принятия на работу не может быть позже даты увольнения
    CONSTRAINT ck_employees_status CHECK (status IN ('Работает', 'Уволен', 'В отпуске'))
);

use shoes_factory_db
SELECT * FROM clients
SELECT * FROM  employees

DELIMITER //
CREATE PROCEDURE  get_employees_by_status(IN p_status VARCHAR(20) )
BEGIN
	SELECT * FROM  employees
    WHERE status = p_status;
END //

DELIMITER //

-- Добавление нового сотрудника
CREATE PROCEDURE add_employee(
    IN p_last_name VARCHAR(100),
    IN p_first_name VARCHAR(100),
    IN p_middle_name VARCHAR(100),
    IN p_date_of_birth DATE,
    IN p_phone VARCHAR(12),
    IN p_email VARCHAR(100),
    IN p_hire_date DATE,
    IN p_dismissal_date DATE,
    IN p_passport_series VARCHAR(4),
    IN p_passport_number VARCHAR(6),
    IN p_position VARCHAR(100),
    IN p_status VARCHAR(20)
)
BEGIN
    INSERT INTO employees (last_name, first_name, middle_name, date_of_birth, phone, email, hire_date, dismissal_date, passport_series, passport_number, position, status) 
    VALUES (p_last_name, p_first_name, p_middle_name, p_date_of_birth, p_phone, p_email, p_hire_date, p_dismissal_date, p_passport_series, p_passport_number, p_position, p_status);
END //

-- Получение информации о сотруднике по ID
CREATE PROCEDURE get_employee_by_id(IN p_employee_id INT)
BEGIN
    SELECT * FROM employees WHERE employee_id = p_employee_id;
END //

-- Получение всех сотрудников
CREATE PROCEDURE get_all_employees()
BEGIN
    SELECT * FROM employees;
END //

-- Обновление информации о сотруднике
CREATE PROCEDURE update_employee(
    IN p_employee_id INT,
    IN p_last_name VARCHAR(100),
    IN p_first_name VARCHAR(100),
    IN p_middle_name VARCHAR(100),
    IN p_date_of_birth DATE,
    IN p_phone VARCHAR(12),
    IN p_email VARCHAR(100),
    IN p_hire_date DATE,
    IN p_dismissal_date DATE,
    IN p_passport_series VARCHAR(4),
    IN p_passport_number VARCHAR(6),
    IN p_position VARCHAR(100),
    IN p_status VARCHAR(20)
)
BEGIN
    UPDATE employees 
    SET last_name = p_last_name, first_name = p_first_name, middle_name = p_middle_name,
        date_of_birth = p_date_of_birth, phone = p_phone, email = p_email,
        hire_date = p_hire_date, dismissal_date = p_dismissal_date,
        passport_series = p_passport_series, passport_number = p_passport_number,
        position = p_position, status = p_status
    WHERE employee_id = p_employee_id;
END //

-- Удаление сотрудника
CREATE PROCEDURE delete_employee(IN p_employee_id INT)
BEGIN
    DELETE FROM employees WHERE employee_id = p_employee_id;
END //

DELIMITER ;

DELIMITER //
-- Поиск сотрудников по фамилии
CREATE PROCEDURE get_employees_by_last_name(IN p_last_name VARCHAR(100))
BEGIN
    SELECT * FROM employees WHERE last_name = p_last_name;
END //
DELIMITER ;


-- Поставщики
CREATE TABLE suppliers (
    supplier_id INT AUTO_INCREMENT,  -- Уникальный идентификатор поставщика
    title VARCHAR(100) NOT NULL,  -- Название поставщика
    contact_details VARCHAR(255) NOT NULL,  -- Контактные данные поставщика
    address VARCHAR(255) NOT NULL,  -- Адрес поставщика
    phone VARCHAR(12) NOT NULL,  -- Телефон поставщика
    email VARCHAR(100) NOT NULL,  -- Электронная почта поставщика
    tin VARCHAR(12) NOT NULL,  -- ИНН поставщика
    CONSTRAINT pk_suppliers_supplier_id PRIMARY KEY(supplier_id),  -- Первичный ключ
    CONSTRAINT uq_suppliers_phone UNIQUE(phone),  -- Уникальность телефона
    CONSTRAINT uq_suppliers_email UNIQUE(email),  -- Уникальность email
    CONSTRAINT uq_suppliers_tin UNIQUE(tin),  -- Уникальность ИНН
    CONSTRAINT ck_suppliers_phone CHECK (phone REGEXP '^\\+7\\d{10}$'),  -- Проверка формата телефона
    CONSTRAINT ck_suppliers_email CHECK (email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),  -- Проверка формата email
    CONSTRAINT ck_suppliers_tin CHECK (CHAR_LENGTH(tin) = 10 OR CHAR_LENGTH(tin) = 12)  -- Проверка длины ИНН (10 или 12 символов)
);

DELIMITER //

-- Добавление нового поставщика
CREATE PROCEDURE add_supplier(
    IN p_title VARCHAR(100),
    IN p_contact_details VARCHAR(255),
    IN p_address VARCHAR(255),
    IN p_phone VARCHAR(12),
    IN p_email VARCHAR(100),
    IN p_tin VARCHAR(12)
)
BEGIN
    INSERT INTO suppliers (title, contact_details, address, phone, email, tin) 
    VALUES (p_title, p_contact_details, p_address, p_phone, p_email, p_tin);
END //

-- Получение информации о поставщике по ID
CREATE PROCEDURE get_supplier_by_id(IN p_supplier_id INT)
BEGIN
    SELECT * FROM suppliers WHERE supplier_id = p_supplier_id;
END //

-- Получение всех поставщиков
CREATE PROCEDURE get_all_suppliers()
BEGIN
    SELECT * FROM suppliers;
END //

-- Поиск поставщиков по названию
CREATE PROCEDURE get_suppliers_by_title(IN p_title VARCHAR(100))
BEGIN
    SELECT * FROM suppliers WHERE title = p_title;
END //

-- Обновление информации о поставщике
CREATE PROCEDURE update_supplier(
    IN p_supplier_id INT,
    IN p_title VARCHAR(100),
    IN p_contact_details VARCHAR(255),
    IN p_address VARCHAR(255),
    IN p_phone VARCHAR(12),
    IN p_email VARCHAR(100),
    IN p_tin VARCHAR(12)
)
BEGIN
    UPDATE suppliers 
    SET title = p_title, contact_details = p_contact_details, address = p_address,
        phone = p_phone, email = p_email, tin = p_tin
    WHERE supplier_id = p_supplier_id;
END //

-- Удаление поставщика
CREATE PROCEDURE delete_supplier(IN p_supplier_id INT)
BEGIN
    DELETE FROM suppliers WHERE supplier_id = p_supplier_id;
END //

DELIMITER ;

SELECT * FROM products
SELECT * FROM products_materials

-- Таблица хранит информацию о материалах, поставляемых поставщиками
CREATE TABLE materials (
    material_id INT AUTO_INCREMENT,  -- Уникальный идентификатор материала
    supplier_id INT  NULL,  -- Идентификатор поставщика
    title VARCHAR(100) NOT NULL,  -- Название материала
    price DECIMAL(10,2) NOT NULL,  -- Цена материала
	quantity INT NOT NULL DEFAULT 0 , -- Количество материала
    unit_of_measure VARCHAR(50) NOT NULL DEFAULT 'кг',  -- Единица измерения (по умолчанию 'кг')
    supply_date DATE NOT NULL,  -- Дата поставки
    CONSTRAINT pk_materials_material_id PRIMARY KEY(material_id),
    CONSTRAINT fk_materials_suppliers FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id), -- Внешний ключ
    ON DELETE SET NULL,
    CONSTRAINT ck_materials_price CHECK (price >= 0),
    CONSTRAINT ck_materials_unit_of_measure CHECK (unit_of_measure IN ('кг', 'г', 'тон', 'м' ,'кв.м', 'см', 'мм', "шт", "л" )),
    CONSTRAINT ck_materials_quantity CHECK(quantity > 0)
);


use shoes_factory_db
SELECT * FROM Materials
SELECT * FROM Suppliers


SELECT * FROM Materials
SELECT * FROM Products

DELIMITER //


-- Добавление нового материала
CREATE PROCEDURE add_material(
    IN p_supplier_id INT,
    IN p_title VARCHAR(100),
    IN p_price DECIMAL(10,2),
    IN p_quantity INT,
    IN p_unit_of_measure VARCHAR(50),
    IN p_supply_date DATE
)
BEGIN
    INSERT INTO materials (supplier_id, title, price, quantity ,unit_of_measure, supply_date) 
    VALUES (p_supplier_id, p_title, p_price ,  p_quantity, p_unit_of_measure, p_supply_date);
END //

-- Получение информации о материале по ID
CREATE PROCEDURE get_material_by_id(IN p_material_id INT)
BEGIN
    SELECT * FROM materials WHERE material_id = p_material_id;
END //

-- Получение всех материалов
CREATE PROCEDURE get_all_materials()
BEGIN
    SELECT * FROM materials;
END //

-- Поиск материалов по названию
CREATE PROCEDURE get_materials_by_title(IN p_title VARCHAR(100))
BEGIN
    SELECT * FROM materials WHERE title = p_title;
END //

-- Фильтр материалов по цене
CREATE PROCEDURE get_materials_by_price_range(
    IN p_min_price DECIMAL(10,2), 
    IN p_max_price DECIMAL(10,2)
)
BEGIN
    SELECT * FROM materials WHERE price BETWEEN p_min_price AND p_max_price;
END //

DELIMITER //
-- Обновление информации о материале
CREATE PROCEDURE update_material(
    IN p_material_id INT,
    IN p_supplier_id INT,
    IN p_title VARCHAR(100),
    IN p_price DECIMAL(10,2),
	IN p_quantity INT,
    IN p_unit_of_measure VARCHAR(50),
    IN p_supply_date DATE
)
BEGIN
    UPDATE materials 
    SET supplier_id = p_supplier_id, title = p_title, price = p_price,
		quantity = p_quantity,
        unit_of_measure = p_unit_of_measure, supply_date = p_supply_date
    WHERE material_id = p_material_id;
END //

-- Удаление материала
CREATE PROCEDURE delete_material(IN p_material_id INT)
BEGIN
    DELETE FROM materials WHERE material_id = p_material_id;
END //

DELIMITER ;


-- Добавляем ограничение через триггер
DELIMITER //
CREATE TRIGGER trg_materials_supply_date BEFORE INSERT ON materials
FOR EACH ROW
BEGIN
    IF NEW.supply_date > CURDATE() THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Дата поставки не может быть в будущем';
    END IF;
END;
//
DELIMITER ;

-- Таблица хранит информацию о продуктах, производимых компанией
CREATE TABLE products (
    product_id INT AUTO_INCREMENT,  -- Уникальный идентификатор продукта
    title VARCHAR(100) NOT NULL,  -- Название продукта
    price DECIMAL(10,2) NOT NULL,  -- Цена продукта
    article VARCHAR(50)  NOT NULL,  -- Артикул продукта (уникальный)
    size INT  NOT NULL,  -- Размер продукта (в пределах от 30 до 50)
    color VARCHAR(50) NOT NULL,  -- Цвет продукта
    CONSTRAINT pk_products_product_id PRIMARY KEY(product_id),
    CONSTRAINT uq_products_article UNIQUE(article),  -- Уникальный артикул
    CONSTRAINT ck_products_size CHECK (size BETWEEN 0 AND 50),  -- Ограничение на размер продукта
    CONSTRAINT ck_products_price CHECK (price >= 0)  -- Ограничение на цену продукта
);


SELECT * FROM products


DELIMITER $$

CREATE PROCEDURE delete_product(
    IN p_product_id INT
)
BEGIN
    DELETE FROM products WHERE product_id = p_product_id;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE update_product(
    IN p_product_id INT,
    IN p_title VARCHAR(100),
    IN p_price DECIMAL(10,2),
    IN p_article VARCHAR(50),
    IN p_size INT,
    IN p_color VARCHAR(50)
)
BEGIN
    UPDATE products 
    SET title = p_title,
        price = p_price,
        article = p_article,
        size = p_size,
        color = p_color
    WHERE product_id = p_product_id;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE get_product_by_id(
    IN p_product_id INT
)
BEGIN
    SELECT * FROM products WHERE product_id = p_product_id;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE create_product(
    IN p_title VARCHAR(100),
    IN p_price DECIMAL(10,2),
    IN p_article VARCHAR(50),
    IN p_size INT,
    IN p_color VARCHAR(50)
)
BEGIN
    INSERT INTO products (title, price, article, size, color)
    VALUES (p_title, p_price, p_article, p_size, p_color);
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE get_all_products()
BEGIN
    SELECT * FROM products;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE get_products_by_title(
    IN p_title VARCHAR(100)
)
BEGIN
    SELECT * 
    FROM products
    WHERE title LIKE CONCAT('%', p_title, '%');
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE get_products_by_article(
    IN p_article VARCHAR(50)
)
BEGIN
    SELECT * 
    FROM products
    WHERE article LIKE CONCAT('%', p_article, '%');
END $$

DELIMITER ;


DELIMITER $$
CREATE PROCEDURE get_products_by_price_range(
    IN p_min_price DECIMAL(10,2),
    IN p_max_price DECIMAL(10,2)
)
BEGIN
    SELECT * 
    FROM products
    WHERE price BETWEEN p_min_price AND p_max_price;
END $$

DELIMITER ;



-- Таблица хранит информацию о складах компании
CREATE TABLE warehouses (
    warehouse_id INT AUTO_INCREMENT,  -- Уникальный идентификатор склада
    responsible_employee_id INT  NULL,  -- Идентификатор сотрудника, ответственного за склад
    address VARCHAR(255)  NOT  NULL,  -- Адрес склада
    phone VARCHAR(12) NOT NULL,  -- Телефон склада
    product_quantity INT NOT NULL DEFAULT 0,  -- Количество продукции на складе
    CONSTRAINT pk_warehouses_warehouse_id PRIMARY KEY(warehouse_id),
    CONSTRAINT uq_warehouses_phone UNIQUE(phone),  -- Уникальный телефон
    CONSTRAINT fk_warehouses_employees FOREIGN KEY(responsible_employee_id) REFERENCES employees(employee_id) -- Внешний ключ на таблицу Employees
    ON DELETE SET NULL,
    CONSTRAINT ck_warehouses_phone CHECK (phone REGEXP '^\\+7\\d{10}$'),  -- Проверка формата телефона (начинается с +7 и состоит из 10 цифр)
    CONSTRAINT ck_warehouses_product_quantity CHECK (product_quantity >= 0)  -- Проверка на количество продукции (не может быть меньше 0)
);

SELECT * FROM  warehouses
SELECT * FROM clients
SELECT * FROM employees

DELIMITER $$

CREATE PROCEDURE add_warehouse(
    IN p_responsible_employee_id INT,
    IN p_address VARCHAR(255),
    IN p_phone VARCHAR(12),
    IN p_product_quantity INT
)
BEGIN
    INSERT INTO warehouses (responsible_employee_id, address, phone, product_quantity)
    VALUES (p_responsible_employee_id, p_address, p_phone, p_product_quantity);
END $$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE get_warehouse_by_id(
    IN p_warehouse_id INT
)
BEGIN
    SELECT * FROM warehouses WHERE warehouse_id = p_warehouse_id;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE update_warehouse(
    IN p_warehouse_id INT,
    IN p_responsible_employee_id INT,
    IN p_address VARCHAR(255),
    IN p_phone VARCHAR(12),
    IN p_product_quantity INT
)
BEGIN
    UPDATE warehouses
    SET responsible_employee_id = p_responsible_employee_id,
        address = p_address,
        phone = p_phone,
        product_quantity = p_product_quantity
    WHERE warehouse_id = p_warehouse_id;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE delete_warehouse(
    IN p_warehouse_id INT
)
BEGIN
    DELETE FROM warehouses WHERE warehouse_id = p_warehouse_id;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE get_warehouse_by_phone(
    IN p_phone VARCHAR(12)
)
BEGIN
    SELECT * FROM warehouses WHERE phone = p_phone;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE get_all_warehouses()
BEGIN
    SELECT * FROM warehouses;
END $$

DELIMITER ;



-- Таблица хранит информацию о производственных заказах на продукцию
CREATE TABLE production_orders (
    production_order_id INT AUTO_INCREMENT,  -- Уникальный идентификатор заказа
    product_id INT NOT NULL,  -- Идентификатор продукта
    quantity INT NOT NULL,  -- Количество продукции в заказе
    order_date DATETIME DEFAULT NOW(),  -- Дата заказа
    planned_completion_date DATE NOT NULL,  -- Планируемая дата завершения заказа
    actual_completion_date DATE  NULL,  -- Реальная дата завершения заказа
    status VARCHAR(50)  NOT NULL DEFAULT 'В производстве',  -- Статус заказа
    CONSTRAINT pk_production_orders_production_order_id PRIMARY KEY(production_order_id),
    CONSTRAINT fk_production_orders_products FOREIGN KEY (product_id) REFERENCES products(product_id),  -- Внешний ключ, ссылающийся на таблицу Products
    CONSTRAINT ck_production_orders_quantity CHECK (quantity >= 0),  -- Проверка на количество продукции (не может быть меньше 0)
    CONSTRAINT ck_production_orders_planned_completion_date CHECK ( planned_completion_date >= order_date),  -- Планируемая дата не может быть раньше даты заказа
    CONSTRAINT ck_production_orders_actual_completion_date CHECK (actual_completion_date IS NULL OR actual_completion_date >= planned_completion_date OR actual_completion_date >= order_date) , -- Реальная дата завершения не может быть раньше планируемой или даты заказа
    CONSTRAINT ck_production_orders_status CHECK (status IN ('В производстве', 'Выполнен', 'Отменен'))
);

SELECT * FROM  production_orders
SELECT * FROM products
SELECT * FROM clients


DELIMITER $$
CREATE PROCEDURE get_production_orders_by_status(IN p_status VARCHAR(50))
BEGIN
	SELECT * FROM  production_orders 
    WHERE status  = p_status ;
END $$

DELIMITER $$

CREATE PROCEDURE add_production_order(
    IN p_product_id INT,
    IN p_quantity INT,
    IN p_planned_completion_date DATE,
    IN p_status VARCHAR(50)
)
BEGIN
    INSERT INTO production_orders (product_id, quantity, planned_completion_date, status)
    VALUES (p_product_id, p_quantity, p_planned_completion_date, p_status);
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE get_production_order_by_id(
    IN p_production_order_id INT
)
BEGIN
    SELECT * FROM production_orders WHERE production_order_id = p_production_order_id;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE get_all_production_orders()
BEGIN
    SELECT * FROM production_orders;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE update_production_order(
    IN p_production_order_id INT,
    IN p_product_id INT,
    IN p_quantity INT,
    IN p_planned_completion_date DATE,
    IN p_actual_completion_date DATE,
    IN p_status VARCHAR(50)
)
BEGIN
    UPDATE production_orders
    SET product_id = p_product_id,
        quantity = p_quantity,
        planned_completion_date = p_planned_completion_date,
        actual_completion_date = p_actual_completion_date,
        status = p_status
    WHERE production_order_id = p_production_order_id;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE delete_production_order(
    IN p_production_order_id INT
)
BEGIN
    DELETE FROM production_orders WHERE production_order_id = p_production_order_id;
END $$

DELIMITER ;


DELIMITER $$
CREATE PROCEDURE get_production_orders_by_status(
    IN p_status VARCHAR(50)
)
BEGIN
    SELECT * FROM production_orders WHERE status = p_status;
END $$

DELIMITER ;



USE shoes_factory_db
DROP  TABLE clients
-- Таблица хранит информацию о клиентах компании
CREATE TABLE clients (
    client_id INT AUTO_INCREMENT,  -- Уникальный идентификатор клиента
    last_name VARCHAR(100) NOT NULL,  -- Фамилия клиента
    first_name VARCHAR(100) NOT NULL,  -- Имя клиента
    middle_name VARCHAR(100) NULL,  -- Отчество клиента
    form_organization VARCHAR(100) NOT NULL, -- Форма организации
    contact_details VARCHAR(255) NOT NULL,  -- Контактные данные клиента
    email VARCHAR(100) NOT NULL,  -- Электронная почта клиента (необязательно)
    phone VARCHAR(12) NOT NULL,  -- Телефон клиента (необязательно)
    registration_date DATETIME NOT NULL DEFAULT NOW(),  -- Дата регистрации клиента
    type VARCHAR(20)  NOT NULL DEFAULT 'Физлицо',  -- Тип клиента (физическое лицо или юридическое лицо)
    CONSTRAINT pk_clients_client_id PRIMARY KEY(client_id),
    CONSTRAINT uq_clients_phone UNIQUE(phone),
    CONSTRAINT uq_clients_email UNIQUE(email),
    CONSTRAINT ck_clients_first_name CHECK (first_name REGEXP '^[a-zA-Zа-яА-ЯёЁ_\\- ]+$'),
    CONSTRAINT ck_clients_last_name CHECK (last_name REGEXP '^[a-zA-Zа-яА-ЯёЁ_\\- ]+$'),
	CONSTRAINT ck_clients_middle_name CHECK (middle_name REGEXP '^[a-zA-Zа-яА-ЯёЁ_\\- ]+$'),
    CONSTRAINT ck_clients_email CHECK (email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),  -- Проверка формата email
    CONSTRAINT ck_clients_phone CHECK (phone REGEXP '^\\+7\\d{10}$'),  -- Проверка формата телефона (начинается с +7 и состоит из 10 цифр)
    CONSTRAINT ck_clients_type CHECK (type IN ('Физлицо', 'Юрлицо'))
);

SELECT * FROM clients
SELECT * FROM Suppliers
SELECT * FROM employees

DELIMITER $$
CREATE PROCEDURE get_clients_by_type(IN p_type VARCHAR(20))
BEGIN
	SELECT * FROM clients
    WHERE type = p_type;
END $$


DELIMITER $$
CREATE PROCEDURE add_client(
    IN p_last_name VARCHAR(100),
    IN p_first_name VARCHAR(100),
    IN p_middle_name VARCHAR(100),
    IN p_form_organization VARCHAR(100),
    IN p_contact_details VARCHAR(255),
    IN p_email VARCHAR(100),
    IN p_phone VARCHAR(12),
    IN p_type VARCHAR(20)
)
BEGIN
    INSERT INTO clients (last_name, first_name, middle_name,form_organization ,contact_details, email, phone, type)
    VALUES (p_last_name, p_first_name, p_middle_name, p_form_organization ,p_contact_details, p_email, p_phone, p_type);
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE get_client_by_id(
    IN p_client_id INT
)
BEGIN
    SELECT * FROM clients WHERE client_id = p_client_id;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE get_all_clients()
BEGIN
    SELECT * FROM clients;
END $$

DELIMITER ;


DELIMITER $$
CREATE PROCEDURE update_client(
    IN p_client_id INT,
    IN p_last_name VARCHAR(100),
    IN p_first_name VARCHAR(100),
    IN p_middle_name VARCHAR(100),
    IN p_form_organization VARCHAR(100),
    IN p_contact_details VARCHAR(255),
    IN p_email VARCHAR(100),
    IN p_phone VARCHAR(12),
    IN p_type VARCHAR(20)
)
BEGIN
    UPDATE clients
    SET last_name = p_last_name,
        first_name = p_first_name,
        middle_name = p_middle_name,
        form_organization = p_form_organization,
        contact_details = p_contact_details,
        email = p_email,
        phone = p_phone,
        type = p_type
    WHERE client_id = p_client_id;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE delete_client(
    IN p_client_id INT
)
BEGIN
    DELETE FROM clients WHERE client_id = p_client_id;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE get_client_by_form_organization(
    IN p_form_organization VARCHAR(100)
)
BEGIN
    SELECT * FROM clients WHERE form_organization LIKE CONCAT('%', p_form_organization, '%');
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE get_client_by_phone(
    IN p_phone VARCHAR(12)
)
BEGIN
    SELECT * FROM clients WHERE phone = p_phone;
END $$

DELIMITER ;



-- Заказы клиентов
CREATE TABLE clients_orders (
    client_order_id INT AUTO_INCREMENT,  -- Уникальный идентификатор заказа
    client_id INT NOT NULL,  -- Идентификатор клиента
    product_id INT NOT NULL,  -- Идентификатор продукта
    quantity INT NOT NULL,  -- Количество продукции в заказе
    order_date DATETIME NOT NULL DEFAULT NOW(),  -- Дата оформления заказа
    expected_delivery_date DATE NOT NULL,  -- Ожидаемая дата доставки
    delivery_address VARCHAR(255) NOT NULL,  -- Адрес доставки
    payment_method VARCHAR(50) NOT NULL,  -- Способ оплаты
    status VARCHAR(50) NOT NULL DEFAULT 'Новый',  -- Статус заказа
    CONSTRAINT pk_clients_orders_client_id PRIMARY KEY(client_order_id),  -- Основной ключ
    CONSTRAINT fk_clients_orders_clients FOREIGN KEY (client_id) REFERENCES clients(client_id)  -- Внешний ключ (клиенты),
    ON DELETE CASCADE,
    CONSTRAINT fk_clients_orders_products FOREIGN KEY (product_id) REFERENCES products(product_id),  -- Внешний ключ (продукты)
    CONSTRAINT ck_clients_orders_quantity CHECK (quantity > 0),  -- Количество должно быть больше 0
    CONSTRAINT ck_clients_orders_delivery_date CHECK (expected_delivery_date >= order_date),  -- Дата доставки не раньше даты заказа
    CONSTRAINT ck_clients_orders_payment_method CHECK (payment_method IN ('Наличные', 'Банковская карта', 'Перевод', 'СБП')),
    CONSTRAINT ck_clients_orders_status CHECK (status IN ('Новый', 'В процессе', 'Выполнен', 'Отменен', "В доставке"))
);



ALTER TABLE clients_orders
ADD  CONSTRAINT fk_clients_orders_clients FOREIGN KEY (client_id) REFERENCES clients(client_id)

SELECT * FROM  clients_orders

DELIMITER $$
CREATE  PROCEDURE get_clients_orders_by_status(IN p_status VARCHAR(50))
BEGIN
	SELECT * FROM  clients_orders
    WHERE status = p_status;
END $$

DELIMITER $$
CREATE  PROCEDURE  get_clients_orders_by_payment_method(IN p_payment_method VARCHAR(50))
BEGIN
		SELECT * FROM clients_orders
        WHERE  payment_method =  p_payment_method;
END $$

DELIMITER $$

CREATE PROCEDURE add_client_order(
    IN p_client_id INT,
    IN p_product_id INT,
    IN p_quantity INT,
    IN p_expected_delivery_date DATE,
    IN p_delivery_address VARCHAR(255),
    IN p_payment_method VARCHAR(50),
    IN p_status VARCHAR(50)
)
BEGIN
    INSERT INTO clients_orders (client_id, product_id, quantity, expected_delivery_date, delivery_address, payment_method, status)
    VALUES (p_client_id, p_product_id, p_quantity, p_expected_delivery_date, p_delivery_address, p_payment_method, p_status);
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE get_client_order_by_id(
    IN p_client_order_id INT
)
BEGIN
    SELECT * FROM clients_orders WHERE client_order_id = p_client_order_id;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE get_all_client_orders()
BEGIN
    SELECT * FROM clients_orders;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE update_client_order(
    IN p_client_order_id INT,
    IN p_client_id INT,
    IN p_product_id INT,
    IN p_quantity INT,
    IN p_expected_delivery_date DATE,
    IN p_delivery_address VARCHAR(255),
    IN p_payment_method VARCHAR(50),
    IN p_status VARCHAR(50)
)
BEGIN
    UPDATE clients_orders
    SET client_id = p_client_id,
        product_id = p_product_id,
        quantity = p_quantity,
        expected_delivery_date = p_expected_delivery_date,
        delivery_address = p_delivery_address,
        payment_method = p_payment_method,
        status = p_status
    WHERE client_order_id = p_client_order_id;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE delete_client_order(
    IN p_client_order_id INT
)
BEGIN
    DELETE FROM clients_orders WHERE client_order_id = p_client_order_id;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE get_client_orders_by_client_id(
    IN p_client_id INT
)
BEGIN
    SELECT * FROM clients_orders WHERE client_id = p_client_id;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE get_client_orders_by_product_id(
    IN p_product_id INT
)
BEGIN
    SELECT * FROM clients_orders WHERE product_id = p_product_id;
END $$

DELIMITER ;




-- Добавляем триггер для проверки order_date
DELIMITER //
CREATE TRIGGER trg_clients_orders_order_date BEFORE INSERT ON clients_orders
FOR EACH ROW
BEGIN
    IF NEW.order_date > NOW() THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Дата заказа не может быть в будущем';
    END IF;
END;
//
DELIMITER ;

SELECT * FROM products;
SELECT * FROM products_warehouses;

-- Таблица хранит продукты и склады
CREATE TABLE products_warehouses (
    product_warehouse_id INT AUTO_INCREMENT,  -- Уникальный идентификатор записи
    product_id INT NOT NULL,  -- Идентификатор продукта
    warehouse_id INT NOT NULL,  -- Идентификатор склада
    quantity INT NOT NULL DEFAULT 0,  -- Количество продукции на складе
    CONSTRAINT pk_products_warehouse_products_warehouse_id PRIMARY KEY(product_warehouse_id),  -- Основной ключ для записи
    CONSTRAINT fk_products_warehouse_products FOREIGN KEY (product_id) REFERENCES products(product_id)  -- Внешний ключ на таблицу Products
    ON DELETE CASCADE,
    CONSTRAINT fk_products_warehouse_warehouses FOREIGN KEY (warehouse_id) REFERENCES warehouses(warehouse_id) -- Внешний ключ на таблицу Warehouses
	ON DELETE CASCADE,
    CONSTRAINT uq_products_warehouse UNIQUE(product_id, warehouse_id),  -- Уникальная комбинация продукта и склада
    CONSTRAINT ck_products_warehouse_quantity CHECK (quantity >= 0)  -- Количество не может быть отрицательным
);



DELIMITER $$

CREATE PROCEDURE get_product_warehouse_by_product_id(
    IN p_product_id INT
)
BEGIN
	SELECT * FROM 	 products_warehouses
    WHERE  product_id = p_product_id;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE add_product_warehouse(
    IN p_product_id INT,
    IN p_warehouse_id INT,
    IN p_quantity INT
)
BEGIN
    INSERT INTO products_warehouses (product_id, warehouse_id, quantity)
    VALUES (p_product_id, p_warehouse_id, p_quantity);
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE get_product_warehouse_by_id(
    IN p_product_warehouse_id INT
)
BEGIN
    SELECT * FROM products_warehouses WHERE product_warehouse_id = p_product_warehouse_id;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE get_all_product_warehouses()
BEGIN
    SELECT * FROM products_warehouses;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE update_product_warehouse(
    IN p_product_warehouse_id INT,
    IN p_product_id INT,
    IN p_warehouse_id INT,
    IN p_quantity INT
)
BEGIN
    UPDATE products_warehouses
    SET product_id = p_product_id,
        warehouse_id = p_warehouse_id,
        quantity = p_quantity
    WHERE product_warehouse_id = p_product_warehouse_id;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE delete_product_warehouse(
    IN p_product_warehouse_id INT
)
BEGIN
    DELETE FROM products_warehouses WHERE product_warehouse_id = p_product_warehouse_id;
END $$

DELIMITER ;


DELIMITER $$
CREATE PROCEDURE analyze_sales_by_clients()
BEGIN
    SELECT 
        c.client_id,
        c.last_name,
        c.first_name,
        SUM(co.quantity * p.price) AS total_spent,
        RANK() OVER (ORDER BY  SUM(co.quantity * p.price) DESC) AS client_rank
    FROM 
        clients_orders co
    JOIN 
        clients c ON co.client_id = c.client_id
    JOIN 
        products p ON co.product_id = p.product_id
    GROUP BY 
        c.client_id
    ORDER BY 
        total_spent DESC;
END $$

DELIMITER ;


SELECT * FROM CLIENTS
SELECT * FROM clients_orders
SELECT * FROM Products

CALL  analyze_sales_by_clients()

    
DELIMITER $$

CREATE PROCEDURE analyze_average_product_quantity_per_warehouse()
BEGIN
    SELECT 
        w.warehouse_id,
        w.address,
        AVG(pw.quantity) AS avg_product_quantity
    FROM 
        warehouses w
    JOIN 
        products_warehouses pw ON w.warehouse_id = pw.warehouse_id
    GROUP BY 
        w.warehouse_id
    ORDER BY 
        avg_product_quantity DESC;
END $$

DELIMITER ;

CALL  analyze_average_product_quantity_per_warehouse()


DELIMITER $$

CREATE PROCEDURE analyze_total_revenue_per_product()
BEGIN
    SELECT 
        p.product_id,
        p.title,
        SUM(co.quantity * p.price) AS total_revenue
    FROM 
        clients_orders co
    JOIN 
        products p ON co.product_id = p.product_id
    GROUP BY 
        p.product_id
    ORDER BY 
        total_revenue DESC;
END $$

DELIMITER ;

CALL  analyze_total_revenue_per_product()

-- 1. Администратор базы данных (полный доступ)
CREATE USER 'admin_user'@'%' IDENTIFIED BY 'AdminPassword';
GRANT ALL PRIVILEGES ON shoes_factory_db.* TO 'admin_user'@'%';
FLUSH PRIVILEGES;


-- 2. Пользователь с доступом только к SELECT
CREATE USER 'readonly_user'@'%' IDENTIFIED BY 'ReadOnlyPassword';
GRANT SELECT ON shoes_factory_db.* TO 'readonly_user'@'%';
FLUSH PRIVILEGES

-- 3. Пользователь с CRUD операциями (без создания таблиц)
CREATE USER 'crud_user'@'%' IDENTIFIED BY 'CrudPassword';
GRANT SELECT, INSERT, UPDATE, DELETE ON shoes_factory_db.* TO 'crud_user'@'%';
FLUSH PRIVILEGES;


-- 4. Пользователь с доступом только к процедурам
CREATE USER 'app_user'@'%' IDENTIFIED BY 'ProcedurePassword';
GRANT EXECUTE ON shoes_factory_db.* TO 'app_user'@'%';
GRANT SELECT ON shoes_factory_db.* TO 'app_user'@'%';
FLUSH PRIVILEGES;

-- 5 пользователья самого сервера
-- root
-- admin

SHOW FULL TABLES
-- Ассоциации
-- products_materials
-- products_warehouses