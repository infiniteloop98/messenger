const users = require("../../models/users/Users"),
  rooms = require("../../models/rooms/Rooms");

class ContactRepository {
  async get({ user }) {
    const contactIds = user.contacts.map((item) => item.contactId);
    try {
      const contactList = await users.find({ _id: { $in: contactIds } }).exec();
      return contactList;
    } catch (error) {
      return error;
    }
  }

  async show({ params: { id } }) {
    try {
      const contact = await this.getContact(id);
      return contact;
    } catch (error) {
      return error;
    }
  }

  async create({ body: { username }, user }) {
    try {
      const contact = await this.getContact(username, "username"),
        contactExist = await users
          .findOne({
            _id: user._id,
            contacts: { $elemMatch: { contactId: contact._id } },
          })
          .exec();
      if (!contactExist) {
        const newRoom = await new rooms({ userId: user._id }).save();
        await users
          .findOneAndUpdate(
            { _id: user.id },
            {
              $addToSet: {
                contacts: {
                  contactId: contact._id,
                  roomId: newRoom._id,
                },
              },
            },
            { new: true }
          )
          .exec();
        return {
          message: "Contact added successfully.",
          contact,
          roomId: newRoom._id,
          status: 200,
        };
      } else
        return {
          message: "Contact already exist.",
          status: 201,
        };
    } catch (error) {
      return error;
    }
  }

  async destory({ body: { id }, user }) {
    try {
      const contact = await this.getContact(id);
      const pullFromContacts = await users.findOneAndUpdate(
        {
          _id: user._id,
        },
        { $pullAll: { contacts: [contact._id] } },
        { new: true }
      );
      return {
        message: "Contact deleted successfully.",
        contact,
        status: 200,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getContact(value, by = "id") {
    const contact =
      by === "id"
        ? await users.findById(value).exec()
        : await users.findOne({ [by]: value }).exec();
    if (contact) return contact;
    else
      throw {
        message: "Not found.",
        errors: ["Contact not found."],
        status: 404,
      };
  }
}

module.exports = new ContactRepository();
