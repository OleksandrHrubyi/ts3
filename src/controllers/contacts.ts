import { Request, Response, NextFunction } from "express";


import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} from "../model/index";

interface IUser extends Document {
  id: number
  name: string
  favorite?: boolean
  email: string
  phone: string
}

interface UserReq extends Request {
  user: IUser,
}


const getAll = async (req: UserReq, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId: number = req.user?.id;
    const contacts: Array<IUser> = await listContacts(userId, req.query);
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};

const getById = async (req: UserReq, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const user = await getContactById(userId, req.params.contactId);
    if (user) {
      return res.json({
        status: "succes",
        message: "request contact found",
        code: 200,

        data: {
          user,
        },
      });
    } else {
      return res.json({
        status: "error",
        code: 404,
        message: `no contact with id ${req.params.contactId} found`,
        data: " Not Found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const createContact = async (req: UserReq, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const addContacts = await addContact(userId, req.body);
    return res.status(201).json({
      status: "succes",
      code: 201,
      message: "contact created",
      data: {
        addContacts,
      },
    });
  } catch (err) {
    next(err);
  }
};

const rmContactById = async (req: UserReq, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { contactId } = req.params
    const result = await removeContact(userId, contactId);
    if (result) {
      return res.json({
        status: "succes",
        code: 200,
        message: "contact has already been deleted",
        data: { result },
      });
    } else {
      return res.json({
        status: "error",
        code: 404,
        message: `no contact with id ${req.params.contactId} found`,
        data: " Not Found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const updateContactsById = async (req: UserReq, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const updatedUser = await updateContact(
      userId,
      req.params.contactId,
      req.body
    );

    return res.json({
      status: "succes",
      code: 200,
      data: {
        updatedUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateStatusFav = async (req: UserReq, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    if (req.body.favorite) {
      const updateStatusContacts = await updateStatusContact(
        id,
        req.params.contactId,
        req.body
      );

      return res.status(201).json({
        status: "succes",
        code: 201,
        message: "status updated",
        data: {
          updateStatusContacts,
        },
      });
    } else {
      return res.json({
        status: 400,
        message: "missing field favorite",
      });
    }
  } catch (err) {
    next(err);
  }
};

export {
  getAll,
  getById,
  createContact,
  rmContactById,
  updateContactsById,
  updateStatusFav,
};
