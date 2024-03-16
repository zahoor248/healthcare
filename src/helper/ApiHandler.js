import axios from "axios";
import { BASE_URL } from "../Api/BaseUrl";
import { setAppLoading } from "../Store/Actions/Actions";
import store from "../Store/Store";

export const handleAPIRequest = async (method, url, data, params) => {
  const state = store.getState();
  const token = localStorage.getItem("token");
  // store.dispatch(setAppLoading(true));

  let header = null;

  if (method === "post" || method === "put") {
    console.log(method);
    header = {
      "Content-Type": "application/json",
      // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NzBmYzQzZS0zNjdlLTQ5YzMtYTIzNS02ZGU4MjAxY2QxMmMiLCJqdGkiOiJjMjBiOWFiZjM1M2Y2MGNlNDAyMzVmZTUzOWNmMzc4OTIxNWVhZjRhM2E2YjYyZWQ5YjY4N2ViNzQ2OWU1YzhjYThhMTQxZGJjNzBhN2U3ZiIsImlhdCI6MTcxMDE3NjA1Mi4wODk1NjkwOTE3OTY4NzUsIm5iZiI6MTcxMDE3NjA1Mi4wODk1NzAwNDU0NzExOTE0MDYyNSwiZXhwIjoxNzQxNzEyMDUyLjA4NzEzMTk3NzA4MTI5ODgyODEyNSwic3ViIjoiMzYiLCJzY29wZXMiOltdfQ.ADhbhxHn2rpniEqBt_asOHmsUjAQ6m_RTb4BBwfVwbSfB9H23va5uFq4DxCotTaag0VanYsrHzpiMytWCnvwHtcdcQUuK8Gkyo1XluhWIKxGfxIefUhZ9piDjQ0jgY509J78HiBwYW2ejEPrFFARvHh0K4R-jXIs5aIsHboSambCLReFzVlnPnfL8z1F9XpiBOZ4J-hEP12lfiK_4Yv9M_X5XVGkSauo3flFAn3s1DN-eCYKULzcvDqDxxb84-Cqx9B8OmFRzNx5771CS_R7SmrynKtEtpjUu2DfuLzphkcbYlBp3UENVgRfuiuuwrX4iJa6jzv3MsacNzcYsahVB9eNsbVMWbKX6NArpDXaZI8Km-bghG88HVZxFZsyPmdGOpqa1WNvVRGTh_MylTBEOj8i6CnPyRpnBauUDnGEJDE_boC_FgI8r4whxo8vSbieb1SasD6L5W34lLjlTSD9BF6oL8Z6WsqSH48PvqqmitIM2anA1U2DlLNE0vqj5Zdqgya5P61uGAC5RlQJGxw5Mkq6NjLy8JFf2p2E-Ml4LW9_W5AGRX5wqF0LpPUQtnopPs9GKrMQac3yAAMA4DK9Z5lCHvWkH8swhhsQo2cz6X4GDtg_mOqKpBC-NROgp-HZt9nrEOcaoaIjebNIkccbuaAN_glPIUeDVTfEre_wc-M`,
    };
  } else {
    header = {
      // Authorization: `Bearer ${token}`,
      // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NzBmYzQzZS0zNjdlLTQ5YzMtYTIzNS02ZGU4MjAxY2QxMmMiLCJqdGkiOiJjMjBiOWFiZjM1M2Y2MGNlNDAyMzVmZTUzOWNmMzc4OTIxNWVhZjRhM2E2YjYyZWQ5YjY4N2ViNzQ2OWU1YzhjYThhMTQxZGJjNzBhN2U3ZiIsImlhdCI6MTcxMDE3NjA1Mi4wODk1NjkwOTE3OTY4NzUsIm5iZiI6MTcxMDE3NjA1Mi4wODk1NzAwNDU0NzExOTE0MDYyNSwiZXhwIjoxNzQxNzEyMDUyLjA4NzEzMTk3NzA4MTI5ODgyODEyNSwic3ViIjoiMzYiLCJzY29wZXMiOltdfQ.ADhbhxHn2rpniEqBt_asOHmsUjAQ6m_RTb4BBwfVwbSfB9H23va5uFq4DxCotTaag0VanYsrHzpiMytWCnvwHtcdcQUuK8Gkyo1XluhWIKxGfxIefUhZ9piDjQ0jgY509J78HiBwYW2ejEPrFFARvHh0K4R-jXIs5aIsHboSambCLReFzVlnPnfL8z1F9XpiBOZ4J-hEP12lfiK_4Yv9M_X5XVGkSauo3flFAn3s1DN-eCYKULzcvDqDxxb84-Cqx9B8OmFRzNx5771CS_R7SmrynKtEtpjUu2DfuLzphkcbYlBp3UENVgRfuiuuwrX4iJa6jzv3MsacNzcYsahVB9eNsbVMWbKX6NArpDXaZI8Km-bghG88HVZxFZsyPmdGOpqa1WNvVRGTh_MylTBEOj8i6CnPyRpnBauUDnGEJDE_boC_FgI8r4whxo8vSbieb1SasD6L5W34lLjlTSD9BF6oL8Z6WsqSH48PvqqmitIM2anA1U2DlLNE0vqj5Zdqgya5P61uGAC5RlQJGxw5Mkq6NjLy8JFf2p2E-Ml4LW9_W5AGRX5wqF0LpPUQtnopPs9GKrMQac3yAAMA4DK9Z5lCHvWkH8swhhsQo2cz6X4GDtg_mOqKpBC-NROgp-HZt9nrEOcaoaIjebNIkccbuaAN_glPIUeDVTfEre_wc-M`,
    };
  }
  try {
    const response = await axios({
      method: method,
      url: `${BASE_URL}${url}`,
      headers: header,
      data: data,
      params: params,
    });

    console.log(response.data, "faskjhfasjkfahksfhaksfjahs");
    // store.dispatch(setAppLoading(false));
    return response.data;
  } catch (error) {
    console.error(error);
    // store.dispatch(setAppLoading(false));

    throw new Error(error);
  }
};
