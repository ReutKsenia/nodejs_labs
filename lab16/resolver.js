const resolver = {
    getFaculties: (args, context) => {
        if (args.faculty)
            return context.getFaculty(args, context);
        else
            return context.getFaculties(args, context);
    },
    getPulpits: (args, context) => {
        if (args.pulpit)
            return context.getPulpit(args, context);
        else
            return context.getPulpits(args, context);
    },
    getSubjects: (args, context) => {
        if (args.subject)
            return context.getSubject(args, context);
        else
            return context.getSubjects(args, context);
    },
    getTeachers: (args, context) => {
        if (args.teacher)
            return context.getTeacher(args, context);
        else
            return context.getTeachers(args, context);
    },
    setFaculty: async (args, context) => {
        let res = await context.updateFaculty(args, context);
        if (res == null)
            return context.insertFaculty(args, context);
        else
            return res;
    },
    setPulpit: async (args, context) => {
        let res = await context.updatePulpit(args, context);
        if (res == null)
            return context.insertPulpit(args, context);
        else
            return res;
    },
    setSubject: async (args, context) => {
        let res = await context.updateSubject(args, context);
        if (res == null)
            return context.insertSubject(args, context);
        else
            return res;
    },
    setTeacher: async (args, context) => {
        let res = await context.updateTeacher(args, context);
        if (res == null)
            return context.insertTeacher(args, context);
        else
            return res;
    },
    delFaculty: (args, context) => {return context.delFaculty(args, context);},
    delPulpit: (args, context) => {return context.delPulpit(args, context);},
    delSubject: (args, context) => {return context.delSubject(args, context);},
    delTeacher: (args, context) => {return context.delTeacher(args, context);},
    getTeachersByFaculty: (args, context) => {return context.getTeachersByFaculty(args, context);},
    getSubjectsByFaculties: (args, context) => {return context.getSubjectsByFaculties(args, context);}
};

exports.resolver = resolver;