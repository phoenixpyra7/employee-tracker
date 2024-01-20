use employee_db;

INSERT INTO departments (name)
VALUES
    ('Leasing'),
    ('Marketing'),
    ('Accounting'),
    ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Controller', 90000, 1),
    ('Accounts Receivable', 60000, 1),
    ('Accounts Payable', 60000, 1),
    ('Property Manager', 75000, 3),
    ('Leasing Agent', 35000, 3),
    ('Human Resources Manager', 120000, 2),
    ('Marketing Analyst', 85000, 4),
    ('Marketing Assistant', 80000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Diane', 'Kaplon', 1, NULL),
    ('David', 'Douglas', 3, 2),
    ('Stu', 'Shaginaw', 3, NULL),
    ('Jessica', 'Gray', 1, 2),
    ('Alice', 'Kumar', 1, NULL),
    ('Sierra', 'Lugo', 4, 2),
    ('Tyler', 'Lucas', 4, NULL),
    ('Julia', 'Galtarossa', 2, 2);