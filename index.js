const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Schema
const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

// Model
const Contact = mongoose.model('Contact', contactSchema);

// Create Contact (create a document)
const createContact = async () => {
  const contact = new Contact({
    fullName: 'Sam Smith',
    email: 'sam@gmail.com',
    phone: 5555555555,
    age: 30,
  });
  try {
    const result = await contact.save();
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
  }
};

// Get Contacts
const getContacts = async () => {
  /*
  Comparison Query Operators
  - eq
  - ne (not equal)
  - gt
  - gte
  - lt
  - lte
  - in 
  - nin (not in)
  */
  try {
    // const contacts = await Contact.find().limit(2).sort('-age');
    const contacts = await Contact.find({ age: { $in: [30, 19, 80, 65] } });
    console.log(contacts);
  } catch (err) {
    console.error('Error:', err.message);
  }
};

// Update Contact
const updateContact = async (id, age) => {
  try {
    // Query first
    // const contact = await Contact.findById(id);
    // contact.age = age;
    // await contact.save();

    // Update First
    // const result = await Contact.updateOne({ _id: id }, { $set: { age } });

    const contact = await Contact.findByIdAndUpdate(
      id,
      { $set: { age } },
      { new: true }
    );
    console.log(contact);
  } catch (err) {
    console.error('Error:', err.message);
  }
};

// Remove Contact
const removeContact = async id => {
  try {
    // const result = await Contact.deleteOne({ _id: id });
    const contact = await Contact.findByIdAndRemove(id);
    console.log(contact);
  } catch (err) {
    console.error('Error:', err.message);
  }
};

// createContact();
// getContacts();
// updateContact('6357ac56124085a6bbada0d9', 15);
removeContact('6357abf8b65d28d8bc239624');
