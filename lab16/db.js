const mssql = require('mssql/msnodesqlv8');
const config = {driver: 'msnodesqlv8', connectionString:'Driver={SQL Server Native Client 11.0};Server={DESKTOP-L93MRGU\\SQLEXPRESS};Database={RKP};Trusted_Connection={yes};',
    pool: {max: 10, min: 0, softIdleTimeoutMillis: 5000, idleTimeoutMillis: 10000}};

function cDB (cb) {
    this.getFaculties = (args, context) => {
      return (new mssql.Request())
          .query('select * from faculty')
          .then((r) => { return r.recordset;});
    };

    this.getPulpits = (args, context) => {
        return (new mssql.Request())
            .query('select * from pulpit')
            .then((r) => { return r.recordset;});
    };

    this.getSubjects = (args, context) => {
        return (new mssql.Request())
            .query('select * from subject')
            .then((r) => { return r.recordset;});
    };

    this.getTeachers = (args, context) => {
        return (new mssql.Request())
            .query('select * from teacher')
            .then((r) => { return r.recordset;});
    };

    this.getFaculty = (args, context) => {
        return (new mssql.Request())
            .input('p', mssql.NVarChar, args.faculty)
            .query('select top(1) * from faculty where faculty = @p')
            .then((r) => { return r.recordset;});
    };

    this.getPulpit = (args, context) => {
        return (new mssql.Request())
            .input('p', mssql.NVarChar, args.pulpit)
            .query('select top(1) * from pulpit where pulpit = @p')
            .then((r) => { return r.recordset;});
    };

    this.getSubject = (args, context) => {
        return (new mssql.Request())
            .input('p', mssql.NVarChar, args.subject)
            .query('select top(1) * from subject where subject = @p')
            .then((r) => { return r.recordset;});
    };

    this.getTeacher = (args, context) => {
        return (new mssql.Request())
            .input('p', mssql.NVarChar, args.teacher)
            .query('select top(1) * from teacher where teacher = @p')
            .then((r) => { return r.recordset;});
    };

    this.delFaculty = (args, context) => {
        return (new mssql.Request())
            .input('p', mssql.NVarChar, args.faculty)
            .query('delete from faculty where faculty = @p')
            .then((r) => {
                if (r.rowsAffected[0] == 0)
                    return false;
                else
                    return true;
            });
    };

    this.delPulpit = (args, context) => {
        return (new mssql.Request())
            .input('p', mssql.NVarChar, args.pulpit)
            .query('delete from pulpit where pulpit = @p')
            .then((r) => {
                if (r.rowsAffected[0] == 0)
                    return false;
                else
                    return true;
            });
    };

    this.delSubject = (args, context) => {
        return (new mssql.Request())
            .input('p', mssql.NVarChar, args.subject)
            .query('delete from subject where subject = @p')
            .then((r) => {
                if (r.rowsAffected[0] == 0)
                    return false;
                else
                    return true;
            });
    };

    this.delTeacher = (args, context) => {
        return (new mssql.Request())
            .input('p', mssql.NVarChar, args.teacher)
            .query('delete from teacher where teacher = @p')
            .then((r) => {
                if (r.rowsAffected[0] == 0)
                    return false;
                else
                    return true;
            });
    };

    this.insertFaculty = (args, context) => {
        return (new mssql.Request())
            .input('a', mssql.NVarChar, args.faculty)
            .input('b', mssql.NVarChar, args.faculty_name)
            .query('insert faculty(faculty, faculty_name) values (@a, @b)')
            .then((r) => {return args});
    };

    this.insertPulpit = (args, context) => {
        return (new mssql.Request())
            .input('a', mssql.NVarChar, args.pulpit)
            .input('b', mssql.NVarChar, args.pulpit_name)
            .input('c', mssql.NVarChar, args.faculty)
            .query('insert pulpit(pulpit, pulpit_name, faculty) values (@a, @b, @c)')
            .then((r) => {return args});
    };

    this.insertSubject = (args, context) => {
        return (new mssql.Request())
            .input('a', mssql.NVarChar, args.subject)
            .input('b', mssql.NVarChar, args.subject_name)
            .input('c', mssql.NVarChar, args.pulpit)
            .query('insert subject(subject, subject_name, pulpit) values (@a, @b, @c)')
            .then((r) => {return args});
    };

    this.insertTeacher = (args, context) => {
        return (new mssql.Request())
            .input('a', mssql.NVarChar, args.teacher)
            .input('b', mssql.NVarChar, args.teacher_name)
            .input('c', mssql.NVarChar, args.pulpit)
            .query('insert teacher(teacher, teacher_name, pulpit) values (@a, @b, @c)')
            .then((r) => {return args});
    };

    this.updateFaculty = (args, context) => {
        return (new mssql.Request())
            .input('a', mssql.NVarChar, args.faculty)
            .input('b', mssql.NVarChar, args.faculty_name)
            .query('update faculty set faculty = @a, faculty_name = @b where faculty = @a')
            .then((r) => {
                if(r.rowsAffected[0] == 0)
                    return null;
                else
                    return args;
            });
    };

    this.updatePulpit = (args, context) => {
        return (new mssql.Request())
            .input('a', mssql.NVarChar, args.pulpit)
            .input('b', mssql.NVarChar, args.pulpit_name)
            .input('c', mssql.NVarChar, args.faculty)
            .query('update pulpit set pulpit = @a, pulpit_name = @b, faculty = @c where pulpit = @a')
            .then((r) => {
                if(r.rowsAffected[0] == 0)
                    return null;
                else
                    return args;
            });
    };

    this.updateSubject = (args, context) => {
        return (new mssql.Request())
            .input('a', mssql.NVarChar, args.subject)
            .input('b', mssql.NVarChar, args.subject_name)
            .input('c', mssql.NVarChar, args.pulpit)
            .query('update subject set subject = @a, subject_name = @b, pulpit = @c where subject = @a')
            .then((r) => {
                if(r.rowsAffected[0] == 0)
                    return null;
                else
                    return args;
            });
    };

    this.updateTeacher = (args, context) => {
        return (new mssql.Request())
            .input('a', mssql.NVarChar, args.teacher)
            .input('b', mssql.NVarChar, args.teacher_name)
            .input('c', mssql.NVarChar, args.pulpit)
            .query('update teacher set teacher = @a, teacher_name = @b, pulpit = @c where teacher = @a')
            .then((r) => {
                if(r.rowsAffected[0] == 0)
                    return null;
                else
                    return args;
            });
    };

    this.getTeachersByFaculty = (args, context) => {
        return (new mssql.Request())
            .input('f', mssql.NVarChar, args.faculty)
            .query('select teacher.* from teacher ' +
                'inner join pulpit on teacher.pulpit = pulpit.pulpit ' +
                'inner join faculty on pulpit.faculty = faculty.faculty where faculty.faculty = @f')
            .then((r) => { return r.recordset;});
    };

    this.getSubjectsByFaculties = (args, context) => {
        return (new mssql.Request())
            .input('f', mssql.NVarChar, args.faculty)
            .query('select subject.*, pulpit.pulpit_name, pulpit.faculty from subject ' +
                'inner join pulpit on subject.pulpit = pulpit.pulpit ' +
                'inner join faculty on pulpit.faculty = faculty.faculty where faculty.faculty = @f')
            .then((r) => {
                let zaps = (o) => {return {subject: o.subject, subject_name: o.subject_name, pulpit: o.pulpit}};
                let zapp = (o) => {return {pulpit: o.pulpit, pulpit_name: o.pulpit_name, faculty: o.faculty, subjects:[zaps(o)]}};
                let rc = [];
                r.recordset.forEach((el, index) => {
                    if (index == 0)
                        rc.push(zapp(el));
                    else if (rc[rc.length - 1].pulpit != el.pulpit)
                        rc.push(zapp(el));
                    else
                        rc[rc.length - 1].subjects.push(zaps(el));
                });
                return rc;
            });
    };

    this.connect = mssql.connect(config, err => {
        if (err)
            cb(err, null);
        else
            cb(null, this.connect);
    });
}

exports.DB = (cb) => {return new cDB(cb)};