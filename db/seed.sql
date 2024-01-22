use employee_db;

INSERT INTO departments (name)
VALUES
    ('Leasing'),
    ('Marketing'),
    ('Accounting'),
    ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Controller', 90000, 3),
    ('Accounts Receivable', 60000, 3),
    ('Accounts Payable', 60000, 3),
    ('Property Manager', 75000, 1),
    ('Leasing Agent', 35000, 1),
    ('Human Resources Manager', 120000, 4),
    ('Marketing Analyst', 85000, 2),
    ('Marketing Assistant', 80000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Diane', 'Kaplon', 1, NULL),
    ('David', 'Douglas', 4, NULL),
    ('Stu', 'Shaginaw', 5, 2),
    ('Jessica', 'Gray', 2, 1),
    ('Alice', 'Kumar', 3, 1),
    ('Sierra', 'Lugo', 6, NULL),
    ('Tyler', 'Lucas', 7, NULL),
    ('Julia', 'Galtarossa', 8, 7);