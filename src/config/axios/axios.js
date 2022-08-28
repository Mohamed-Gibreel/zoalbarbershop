import axios from "axios";

const api = axios.create({
  headers: {
    Authorization: "Token 4ae3ed70abde2e016b922f6b6de0f599344f8e7a",
  },
});

export const getServies = async () => {
  return await api.get("http://zoolbarbershop.el.r.appspot.com/service/");
};
