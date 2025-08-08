import axios from "axios";

export const BaseUrl = "http://192.168.35.122:4000/api/";

// Login Page APis Section
export const LoginApi = async (data: any) => {
  const API_URL = `${BaseUrl}/login`;

  const payload = {
    email: data.email || "",
    password: data.password || "",
  };

  try {
    //   const response = await axios.post(API_URL, payload);
    //   return response;

    return true;
  } catch (error) {
    throw error;
  }
};

// TwoStep Verification Api section
export const TwoStepVerificationApi = async (data: any) => {
  const API_URL = `${BaseUrl}/twostep/verification`;

  const payload = {
    email: data.email || "",
    code: data.code || "",
  };

  try {
    //   const response = await axios.post(API_URL, payload);
    //   return response.data;

    return true;
  } catch (error) {
    throw error;
  }
};

// Get Obligation List Api
export const getObligationListApi = async (params: any) => {
  const API_URL = `${BaseUrl}/obligation/list`;
  try {
    // const response = await axios.get(API_URL, { params });
    // return response.data;
    return [
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "Confidential_Agreement_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-001",
        "Update On": "10/01/2025 14:45:30",
        Status: "Completed",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "NDA_2024_Analysis_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-013",
        "Update On": "04/06/2025 14:45:42",
        Status: "Active",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "Confidential_Agreement_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-001",
        "Update On": "10/01/2025 14:45:30",
        Status: "Terminate",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "NDA_2024_Analysis_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-013",
        "Update On": "04/06/2025 14:45:42",
        Status: "Active",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "Confidential_Agreement_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-001",
        "Update On": "10/01/2025 14:45:30",
        Status: "Completed",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "NDA_2024_Analysis_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-013",
        "Update On": "04/06/2025 14:45:42",
        Status: "Terminate",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "Confidential_Agreement_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-001",
        "Update On": "10/01/2025 14:45:30",
        Status: "Completed",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "NDA_2024_Analysis_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-013",
        "Update On": "04/06/2025 14:45:42",
        Status: "Active",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "Confidential_Agreement_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-001",
        "Update On": "10/01/2025 14:45:30",
        Status: "Terminate",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "NDA_2024_Analysis_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-013",
        "Update On": "04/06/2025 14:45:42",
        Status: "Active",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "Confidential_Agreement_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-001",
        "Update On": "10/01/2025 14:45:30",
        Status: "Completed",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "NDA_2024_Analysis_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-013",
        "Update On": "04/06/2025 14:45:42",
        Status: "Terminate",
      },
    ];
  } catch (error) {
    throw error;
  }
};

// Obligation View Page Apis
export const getMetricsData = async (id: any) => {
  const API_URL = `${BaseUrl}/obligation/metrics`;

  // const response = await axios.get(API_URL,);
  // return response.data;
  return [
    { label: "Total Classes", value: 34 },
    { label: "Confidence", value: 14 },
    { label: "High Confidence", value: 19 },
    { label: "Total Pages", value: 36 },
    { label: "Processed By", value: "Open Ai" },
  ];
};

export const getContractDetails = async () => {
  const API_URL = `${BaseUrl}/contract/details`;

  // const params = { 'id': id }
  // const response = await axios.get(API_URL);
  // return response.data;
  let data = {
    customer_name: "ALG Glibal Limited",
    extraction_code: "NDA-2025-05-022-013",
    uploaded_file: "NDA_2024_Analysis_Report.pdf",
    uploaded_on: "04/06/2025 03:33:24",
    document_type: "Non-Disclosure Agreements",
    start_date: "23/06/2025",
    end_date: "23/08/2025",
    duration: "60 Days",
  };

  return data;
};

export const getPagesData = async () => {
  const API_URL = `${BaseUrl}/obligation/pages`;

  // const response = await axios.get(API_URL, { params });
  // return response.data;
  return [
    {
      id: 1,
      title: "Page 1",
      section: "1.0",
      subsections: 6,
      mapped: "3/6",
      confidence: "90%",
      description:
        "This schedules 5 defines the way in which benchmarking shall be implemented under this agreement",
      image: "https://i.pravatar.cc/100?u=page1",
      sections: [
        {
          title: "Section 3.1",
          accountability: "",
          severity: "",
          frequency: "",
          deliverable: "",
          obligation:
            "This schedules 5 defines the way in which benchmarking shall be implemented...",
        },
        {
          title: "Section 3.2",
          accountability: "",
          severity: "",
          frequency: "",
          deliverable: "",
          obligation:
            "This schedules 5 defines the way in which benchmarking shall be implemented...",
        },
        {
          title: "Section 3.3",
          accountability: "",
          severity: "",
          frequency: "",
          deliverable: "",
          obligation:
            "This schedules 5 defines the way in which benchmarking shall be implemented...",
        },
      ],
    },
    {
      id: 2,
      title: "Page 2",
      section: "2.0",
      subsections: 4,
      mapped: "3/6",
      confidence: "90%",
      description: "This schedules 5 defines the way in which benchmarking",
      image: "https://i.pravatar.cc/100?u=page2",
      sections: [
        {
          title: "Section 3.1",
          accountability: "",
          severity: "",
          frequency: "",
          deliverable: "",
          obligation:
            "This schedules 5 defines the way in which benchmarking shall be implemented...",
        },
        {
          title: "Section 3.2",
          accountability: "",
          severity: "",
          frequency: "",
          deliverable: "",
          obligation:
            "This schedules 5 defines the way in which benchmarking shall be implemented...",
        },
      ],
    },
  ];
};

export const GetCustomerDetails = async () => {
  const API_URL = `${BaseUrl}/customer/details`;
  // const response = await axios.get(API_URL);
  // return response.data;
  return [
    { label: "Customer Name", value: "ALG Glbal Limited" },
    { label: "Document Name", value: "NDA_2024_Analysis_Report.pdf" },
    { label: "Contract Type", value: "Non-Disclosure Agreements (NDAs)" },
    { label: "Selected Obligations", value: "02" },
  ];
};

export const GetsObligationChartData = async () => {
  const API_URL = `${BaseUrl}/obligations/chart/details`;
  // const response = await axios.get(API_URL);
  // return response.data;
  return [
    { label: "Highly Confidence", value: 45, color: "#dc3545" },
    { label: "Confidence", value: 35, color: "#ffc107" },
  ];
};  

// ---------------------*** Contract Page Api List ***--------------------------------------
// Get Obligation List Api
export const getContractListApi = async (params: any) => {
  const API_URL = `${BaseUrl}/contract/list`;
  try {
    // const response = await axios.get(API_URL, { params });
    // return response.data;
    return [
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "Confidential_Agreement_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-001",
        "Update On": "10/01/2025 14:45:30",
        Status: "Completed",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "NDA_2024_Analysis_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-013",
        "Update On": "04/06/2025 14:45:42",
        Status: "Active",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "Confidential_Agreement_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-001",
        "Update On": "10/01/2025 14:45:30",
        Status: "Terminate",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "NDA_2024_Analysis_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-013",
        "Update On": "04/06/2025 14:45:42",
        Status: "Active",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "Confidential_Agreement_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-001",
        "Update On": "10/01/2025 14:45:30",
        Status: "Completed",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "NDA_2024_Analysis_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-013",
        "Update On": "04/06/2025 14:45:42",
        Status: "Terminate",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "Confidential_Agreement_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-001",
        "Update On": "10/01/2025 14:45:30",
        Status: "Completed",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "NDA_2024_Analysis_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-013",
        "Update On": "04/06/2025 14:45:42",
        Status: "Active",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "Confidential_Agreement_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-001",
        "Update On": "10/01/2025 14:45:30",
        Status: "Terminate",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "NDA_2024_Analysis_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-013",
        "Update On": "04/06/2025 14:45:42",
        Status: "Active",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "Confidential_Agreement_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-001",
        "Update On": "10/01/2025 14:45:30",
        Status: "Completed",
      },
      {
        "Customer Name": "ALG Global Limited",
        "Contract Type": "Non-Disclosure Agreement (NDAs)",
        "File Name": "NDA_2024_Analysis_Report.pdf",
        "Extraction Code": "NDA-2025-05-022-013",
        "Update On": "04/06/2025 14:45:42",
        Status: "Terminate",
      },
    ];
  } catch (error) {
    throw error;
  }
};
