const Contacts = require("./schemas/contacts");

const listContacts = async (userId: number, query) => {
  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    offset = 0,
  } = query;

  const optionsSearch = { owner: userId };

  if (favorite !== null) {
    optionsSearch.favorite = favorite;
  }
  const result = await Contacts.paginate(optionsSearch, {
    offset,
    favorite,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortBy}`]: -1 } : {}),
    },
    select: filter ? filter.split("|").join(" ") : "",
    populate: { path: "owner", select: "name email -_id" },
  });
  return result;
};

const getContactById = async (userId: number, contactId: number) => {
  const result = await Contacts.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "name email -_id",
  });
  return result;
};

const removeContact = async (userId: number, contactId: number) => {
  const result = await Contacts.findByIdAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
};

interface IUserBody extends Document {
  id: number
  name: string
  favorite?: boolean
  email: string
  phone: string
}

const addContact = async (userId: number, body: IUserBody) => {
  const result = await Contacts.create({ ...body, owner: userId });
  return result;
};

interface IUserBodyUpdate extends Document {
  id: number
  name?: string
  favorite?: boolean
  email?: string
  phone?: string
}

const updateContact = async (userId: number, contactId: number, body: IUserBodyUpdate) => {
  const result = await Contacts.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

interface IUserBodyStatus extends Document {
  id: number
  name?: string
  favorite: boolean
  email?: string
  phone?: string
}

const updateStatusContact = async (userId: number, contactId: number, body: IUserBodyStatus) => {
  const result = await Contacts.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { body: body.favorite },
    { new: true }
  );
  console.log(result);
  return result;
};


export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
