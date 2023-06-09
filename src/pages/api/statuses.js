import axios from "axios";
import localforage from "localforage";

export const getStatusById = async (id) => {
  const res = await axios.get(
    `https://online-course-xejk.onrender.com/statuses/${id}`,
    {
      headers: { "x-auth-token": await localforage.getItem("token") },
    }
  );
  return res.data;
};

export const addStatus = async (id) => {
  const res = await axios.post(
    `https://online-course-xejk.onrender.com/statuses/${id}`,
    null,
    {
      headers: {
        "x-auth-token": await localforage.getItem("token"),
      },
    }
  );
  return res.data;
};

export const getAllStatusByUser = async () => {
  const res = await axios.get(
    "https://online-course-xejk.onrender.com/statuses",
    {
      headers: {
        "x-auth-token": await localforage.getItem("token"),
      },
    }
  );
  return res.data;
};
