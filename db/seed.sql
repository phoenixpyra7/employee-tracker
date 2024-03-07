use employee_db;

INSERT INTO departments (name)
VALUES
    ('Leasing'),
    ('Marketing'),
    ('Accounting'),
    ('Human Resources');

INSERT INTO roles (title, salary, department_id) /* role title, yr salery, dept above-index not zero based*/
VALUES
    ('Controller', 90000, 3),
    ('Accounts Receivable', 60000, 3),
    ('Accounts Payable', 60000, 3),
    ('Property Manager', 75000, 1),
    ('Leasing Agent', 35000, 1),
    ('Human Resources Manager', 120000, 4),
    ('Marketing Analyst', 85000, 2),
    ('Marketing Assistant', 80000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id) /*frst/lst name, role above-index not zero based, mngr if aplcbl*/
VALUES
    ('Diane', 'Revlon', 1, NULL),
    ('Doug', 'Davis', 4, NULL),
    ('Stuart', 'Smith', 5, 2),
    ('Jessica', 'Grayson', 2, 1),
    ('Alice', 'Kuper', 3, 1),
    ('Robin', 'Carter', 6, NULL),
    ('Maria', 'Verde', 7, NULL),
    ('Julia', 'DeRossa', 8, 7);