class Sqlcmdr {
    getDepts() {
        return 'SELECT * FROM department';
    }

    getRoles() {
        return 'SELECT R.id, R.title, R.salary, D.name AS department FROM role R JOIN department D ON R.department_id = D.id';
    }

    getEmps() {
        return 'SELECT E.id, E.first_name, E.last_name, R.title AS role, R.salary, D.name AS department, CONCAT(M.first_name," ", M.last_name) AS manager FROM employee E INNER JOIN role R on E.role_id = R.id INNER JOIN department D ON R.department_id = D.id LEFT JOIN employee M ON E.manager_id = M.id';
    }

    addDept(department) {
        return `INSERT INTO department (name) VALUES  ('${department}')`;
    }

    addRole(title, salary, deptId) {
        return `INSERT INTO role (title, salary, department_id) VALUES  ('${title}', ${salary}, ${deptId})`;
    }

    addEmp(fName, lName, roleId, managerId) {
        return `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES  ('${fName}', '${lName}', ${roleId}, ${managerId})`;
    }

    updateEmpRole(empId, newRole) {
        return `UPDATE employee SET role_id = ${newRole} WHERE id = ${empId}`;
    }
}

module.exports = Sqlcmdr;