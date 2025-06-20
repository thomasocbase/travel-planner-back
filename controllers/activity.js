const Activity = require('../models/Activity');
const ActivityType = require('../models/ActivityType');

// Initial data

const initialActivities = [
    {
        title: 'Airbnb Trocadéro',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
        image: 'https://picsum.photos/id/42/800/600',
        url: 'https://www.airbnb.com/rooms/12345678',
        price: 100,
        timeAllocation: 2,
        activityType: '67292f43049c5ab778d542eb',
        location: '48.858285658772594, 2.3532079879966044',
        order: 1,
        dayId: '67324f0d15c4511ae12a271d',
        isArchived: false,
        planId: '672d03bf69f596a99ba87288',
    },
    {
        title: 'Visit the Louvre',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
        image: 'https://picsum.photos/id/290/800/600',
        url: 'https://www.louvre.fr/',
        price: 15,
        timeAllocation: 3,
        activityType: '67292f43049c5ab778d542e8',
        location: '48.860294, 2.337631',
        order: 2,
        dayId: '67324f0d15c4511ae12a271d',
        isArchived: false,
        planId: '672d03bf69f596a99ba87288',
    },
    {
        title: 'Lunch at Le Procope',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
        image: 'https://picsum.photos/id/30/800/600',
        url: 'https://www.leprocope.com/',
        price: 30,
        timeAllocation: 1,
        activityType: '67292f43049c5ab778d542ee',
        location: '48.856613, 2.336442',
        order: 1,
        dayId: '67324f0d15c4511ae12a271d',
        isArchived: true,
        planId: '672d03bf69f596a99ba87288',
    },
    {
        title: 'Hike in the Bois de Vincennes',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
        image: 'https://picsum.photos/id/70/800/600',
        url: 'https://www.boisdevincennes.com/',
        price: 0,
        timeAllocation: 4,
        activityType: '67292f43049c5ab778d542e5',
        location: '48.8196, 2.4346',
        order: 1,
        isArchived: false,
        planId: '672d03bf69f596a99ba87288',
    },
    {
        title: 'Shopping at Galeries Lafayette',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
        image: 'https://picsum.photos/id/119/800/600',
        url: 'https://www.galerieslafayette.com/',
        price: 50,
        timeAllocation: 2,
        activityType: '67292f43049c5ab778d542f1',
        location: '48.8738, 2.3323',
        order: 2,
        isArchived: false,
        planId: '672d03bf69f596a99ba87288',
    },
    {
        title: 'Dinner at Le Train Bleu',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
        image: 'https://picsum.photos/id/10/800/600',
        url: 'https://www.le-train-bleu.com/',
        price: 60,
        timeAllocation: 2,
        activityType: '67292f43049c5ab778d542eb',
        location: '48.8448, 2.3734',
        order: 3,
        isArchived: false,
        planId: '672d03bf69f596a99ba87288',
    },
    {
        title: 'Visit the Eiffel Tower',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
        image: 'https://picsum.photos/id/318/800/600',
        url: 'https://www.toureiffel.paris/',
        price: 45,
        timeAllocation: 3,
        activityType: '67292f43049c5ab778d542e8',
        location: '48.8584, 2.2945',
        order: 3,
        dayId: '67324f0d15c4511ae12a271d',
        isArchived: false,
        planId: '672d03bf69f596a99ba87288',
    },
    {
        title: 'Lunch at Fouquet\'s',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
        image: 'https://picsum.photos/id/30/800/600',
        url: 'https://www.leprocope.com/',
        price: 30,
        timeAllocation: 1,
        activityType: '67292f43049c5ab778d542ee',
        location: '48.8715028248193, 2.3012261116004695',
        order: 2,
        dayId: '67324f0d15c4511ae12a271d',
        isArchived: true,
        planId: '672d03bf69f596a99ba87288',
    },
];

exports.createInitialActivities = async () => {
    try {
        for (let activity of initialActivities) {
            const existingActivity = await Activity.findOne({ title: activity.title });
            if (!existingActivity) {
                const newActivity = new Activity(activity);
                await newActivity.save();
            }
        }
        console.log('Initial activities created');
    } catch (error) {
        console.log(error);
    }
};

// Validation
const validateActivity = (req) => {
    if (req.body.title === '' || req.body.title.length > 50) {
        return 'Title must be between 1 and 50 characters';
    }

    if (req.body.description && req.body.description.length > 500) {
        return 'Description must be between 1 and 500 characters';
    }

    if (req.body.url && !/^(http|https):\/\/[^ "]+$/.test(req.body.url)) {
        return 'URL must be valid';
    }

    if (req.body.price && req.body.price < 0 || isNaN(req.body.price)) {
        return 'Price must be a positive number';
    }

    if (req.body.timeAllocation && req.body.timeAllocation < 0 || isNaN(req.body.timeAllocation)) {
        return 'Time allocation must be a positive number';
    }

    if (req.body.location && req.body.location.length > 50) {
        return 'Location must be between 1 and 50 characters';
    }

    return '';
}

// CRUD ops

exports.getActivitiesByPlan = async (req, res, next) => {
    try {
        const activities = await Activity.find({ planId: req.params.planId }).populate('activityType', 'name');
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.addActivity = async (req, res, next) => {
    try {
        // Validation
        const validationMessage = validateActivity(req);
        if (validationMessage !== '') {
            return res.status(406).json({ message: validationMessage });
        }

        // Create new activity
        let newActivity = {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            url: req.body.url,
            price: req.body.price === '' ? 0 : req.body.price,
            timeAllocation: req.body.timeAllocation === '' ? 0 : req.body.timeAllocation,
            activityType: req.body.activityType._id,
            location: req.body.location,
            order: req.body.order,
            planId: req.body.planId,
            dayId: req.body.dayId,
            isArchived: req.body.isArchived,
        }

        // Send to DB
        await Activity.create(newActivity);
        newActivity = await Activity.findOne(newActivity)
        res.status(201).json({ message: 'Activity created', activity: newActivity });
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.updateActivity = async (req, res, next) => {
    try {
        // Validation
        const validationMessage = validateActivity(req);
        if (validationMessage) {
            return res.status(406).json({ message: validationMessage });
        }

        // Update activity
        let activityToUpdate = await Activity.findOne({ _id: req.params.id });

        activityToUpdate.title = req.body.title;
        activityToUpdate.description = req.body.description;
        activityToUpdate.image = req.body.image;
        activityToUpdate.url = req.body.url;
        activityToUpdate.price = req.body.price === '' ? 0 : req.body.price;
        activityToUpdate.timeAllocation = req.body.timeAllocation === '' ? 0 : req.body.timeAllocation;
        activityToUpdate.activityType = req.body.activityType._id;
        activityToUpdate.location = req.body.location;
        activityToUpdate.order = req.body.order;
        activityToUpdate.planId = req.body.planId;
        activityToUpdate.dayId = req.body.dayId;
        activityToUpdate.isArchived = req.body.isArchived;
        activityToUpdate.updatedAt = Date.now();

        // Send to DB
        await activityToUpdate.save();
        res.status(200).json({ message: 'Activity updated', activity: activityToUpdate });
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.deleteActivity = async (req, res, next) => {
    try {
        await Activity.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Activity deleted' });
    } catch (error) {
        res.status(400).json({ error });
    }
}