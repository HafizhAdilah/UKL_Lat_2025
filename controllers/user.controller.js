import { PrismaClient } from "@prisma/client";
import md5 from "md5";

const prisma = new PrismaClient();

export const addUser = async (req, res) => {
  const { name, username, password, role } = req.body;
  console.log(req.body);
  try {
    if (!name || !username || !password) {
      return res.status(404).json({
        Message: "Data Must Be Filled!!",
      });
    }

    const add = await prisma.user.create({
      data: {
        name: name,
        username: username,
        password: md5(password),
        role: role,
      },
    });

    const userSafe = { ...add };
    delete userSafe.password;

    if (!add) {
      return res.status(404).json({
        Message: "Error While Inputing Data!",
        Information: userSafe,
      });
    }

    res.status(201).json({
      Message: "Data has been created!",
      Information: userSafe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: "Error ->",
      Information: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const id = Number(req.params.id);
  const { name, username, password } = req.body;
  try {
    const findID = await prisma.user.findMany({ where: { id } });
    if (!findID) {
      return res.status(404).json({
        Message: `User With ${id} Not Exist!!!`,
      });
    }

    if (!name || !username || !password) {
      return res.status(404).json({
        Message: "Data Must Be Filled!!",
      });
    }

    const update = await prisma.user.updateMany({
      where: {
        id: id,
      },
      data: {
        name: name,
        username: username,
        password: md5(password),
      },
    });

    const user = await prisma.user.findMany({ where: { id: id } });
    const userSafe = user.map(({ password, ...rest }) => rest);

    if (!update || update.count === 0) {
      return res.status(404).json({
        Message: "Error While Updating Users!!",
        Information: userSafe,
      });
    }

    res.status(200).json({
      Message: "User has been updated!",
      Information: userSafe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: "Error ->",
      Information: error.message,
    });
  }
};

export const findUser = async (req, res) => {
  const { name, username } = req.body;
  try {
    let where = {};

    if (name) where.name = name;
    if (username) where.username = username;

    if (Object.keys(where).length === 0) {
      const showAll = await prisma.user.findMany({});

      if (!showAll || showAll.length === 0) {
        return res.status(404).json({
          Message: "Error While Showing Data!!",
        });
      }
      const userSafe = showAll.map((user) => {
        const { password, ...rest } = user;
        return rest;
      });

      return res.status(200).json({
        Message: "Can't find that data!?. Showing All Data!",
        Information: userSafe,
      });
    }

    const find = await prisma.user.findMany({ where });

    if (!find || find.length > 0) {
      return res.status(404).json({
        Message: "No users match the filter",
        Information: [],
      });
    }

    const userSafe = find.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });

    res.status(200).json({
      Message: "User Has Been Found!",
      Information: userSafe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: "Error ->",
      Information: error.message,
    });
  }
};
export const userById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const findID = await prisma.user.findMany({ where: { id } });
    if (!findID) {
      return res.status(404).json({
        Message: `User With ${id} Not Exist!!!`,
      });
    }

    const findById = await prisma.user.findMany({
      where: {
        id: id,
      },
    });

    if (!findById || findById.length === 0) {
      return res.status(404).json({
        Message: "Can't Found That Data!",
        Information: [],
      });
    }

    res.status(200).json({
      Message: "User has been found!",
      Information: findById,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: "Error ->",
      Information: error.message,
    });
  }
};
