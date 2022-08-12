class Sqlcmdr {
    getDepts() {
        return 'SELECT * FROM department';
    }

    getRoles() {
        return 'SELECT * FROM role';
    }

    getEmps() {
        return 'SELECT * FROM employee';
    }

    addDept(department) {
        return `INSERT INTO department (name) VALUES  (${department})`;
    }

    addRole(title, salary, deptId) {
        return `INSERT INTO role (title, salary, department_id) VALUES  (${title}, ${salary}, ${deptId})`;
    }

    addEmp(fName, lName, roleId, managerId) {
        return `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES  (${fName}, ${lName}, ${roleId}, ${managerId})`;
    }

    updateEmpRole(empId, newRole) {
        return `UPDATE employee SET role_id = ${newRole} WHERE id = ${empId}`;
    }
}

module.exports = Sqlcmdr;