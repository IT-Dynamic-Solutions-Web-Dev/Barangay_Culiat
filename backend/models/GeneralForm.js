//ito yung general form, image in the messenger. Altho di pa kompleto

const mongoose = require('mongoose');
const { emit } = require('./User');
const e = require('express');

const GeneralFormSchema = new mongoose.Schema({
    personalInformation: {
    surname: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, trim: true },
    suffix: { type: String, trim: true },
    address: { type: String, required: true, trim: true },
    typeOfHome: { type: String, enum: ['Owned', 'Rented', 'Living with Family', 'Other'], required: true },
    nationality: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    placeOfBirth: { type: String, required: true, trim: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    civilStatus: { type: String, enum: ['Single', 'Married', 'Widowed', 'Divorced', 'Separated'], required: true },
    tinNumber: { type: String, trim: true },
    SSS: { type: String, trim: true },
    precinctNumber: { type: String, trim: true },
    religion: { type: String, trim: true },
    height: { type: String, trim: true },
    weight: { type: String, trim: true },
    colorEyesOrHair: { type: String, trim: true },
    contactNumber: { type: String, required: true, trim: true },
    occupation: { type: String, trim: true },
    emergencyContact: {
        name: { type: String, required: true, trim: true },
        relationship: { type: String, required: true, trim: true },
        contactNumber: { type: String, required: true, trim: true },
        email: { type: String, trim: true},
        nameOfSpouse: { type: String, trim: true},
        spouseOccupation: { type: String, trim: true},
        spouseContactNumber: { type: String, trim: true }
        },
    },
});
    
    module.exports = mongoose.model('GeneralForm', GeneralFormSchema);