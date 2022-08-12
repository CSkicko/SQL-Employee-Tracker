INSERT INTO department (name)
    VALUES  ("Marketing"),
            ("Sales"),
            ("Engineering");

INSERT INTO role (title, salary, department_id)
    VALUES  ("Marketing Lead", 120000, 1),
            ("Marketing Specialist", 90000, 1),
            ("Marketing Graduate", 60000, 1),
            ("Sales Lead", 140000, 2),
            ("Salesperson", 100000, 2),
            ("Engineering Lead", 180000, 3),
            ("Engineer", 150000, 3),
            ("Graduate Engineer", 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES  ("Lucy", "McDonald", 1, null),
            ("Brian", "Smith", 2, 1),
            ("Michael", "Sanderson", 3, 1),
            ("Amy", "Davis", 4, null),
            ("Lou", "Gary", 5, 4),
            ("Diane", "Robertson", 6, null),
            ("Ian", "McIntyre", 7, 6),
            ("Stephen", "Londs", 8, 6),
            ("Allen", "Greig", 7, 6),
            ("Joe", "McCormick", 5, 4);