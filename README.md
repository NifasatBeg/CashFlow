# Cash Flow

## Overview
Cash Flow is an application designed to help users track their cash flow efficiently. It consists of multiple backend microservices and a React Native frontend. The project leverages Kong as an API Gateway and utilizes ngrok for deployment on a local system.

## Project Structure

### Backend Microservices
1. **AuthService** - Manages user signup, login, and authentication.
2. **UserService** - Handles user-related and DB schema.
3. **DataExtractionService** - Analyzes mobile notification messages using an LLM to extract merchant and amount details.
4. **CashManager** - Manages Cash flow and transactions.

### Frontend
- Developed using **React Native** for an interactive user experience.

### Configuration & Deployment
- **CashFlowDeps** ([Repository Link](https://github.com/NifasatBeg/CashFlowDeps)) - Contains all configurations and `docker-compose` files.
- **Kong API Gateway** - Routes all requests and ensures authentication via AuthService.
- **ngrok** - Used for deploying and exposing the application from a local environment.

## Repositories
- **Backend Services**
  - [AuthService](https://github.com/NifasatBeg/Authservice)
  - [UserService](https://github.com/NifasatBeg/UserService)
  - [DataExtractionService](https://github.com/NifasatBeg/DataExtraction)
  - [CashManager](https://github.com/NifasatBeg/CashManager)
- **Frontend**
  - [React Native App](https://github.com/NifasatBeg/CashFlow)
- **Dependencies & Configurations**
  - [CashFlowDeps](https://github.com/NifasatBeg/CashFlowDeps)

## Setup & Deployment
1. Clone all required repositories.
2. Run `docker-compose up` from **CashFlowDeps** to start all services.
3. Use ngrok to expose the system for external access.
4. Ensure Kong is correctly configured to route requests through AuthService.
5. Launch the React Native frontend to interact with the system.

## Screenshots
### SignUp
![SignUp Screen](https://github.com/NifasatBeg/CashFlow/blob/d19c1e334a8a0d00c36da27615e9240977250234/asssets/Asignup.png)

### Login
![Login](https://github.com/NifasatBeg/CashFlow/blob/d19c1e334a8a0d00c36da27615e9240977250234/asssets/BLogin.png)

### Home
![Home](https://github.com/NifasatBeg/CashFlow/blob/d19c1e334a8a0d00c36da27615e9240977250234/asssets/CHome.png)
![Bar Chart](https://github.com/NifasatBeg/CashFlow/blob/d19c1e334a8a0d00c36da27615e9240977250234/asssets/CHomeBar.png)
![Time Frame Selector](https://github.com/NifasatBeg/CashFlow/blob/d19c1e334a8a0d00c36da27615e9240977250234/asssets/CTimeFrame.png)
![Week Analysis](https://github.com/NifasatBeg/CashFlow/blob/d19c1e334a8a0d00c36da27615e9240977250234/asssets/CWeek.png)
![Add Expense](https://github.com/NifasatBeg/CashFlow/blob/d19c1e334a8a0d00c36da27615e9240977250234/asssets/CAddExp.png)

### Detailed Expense Page
![Merchant Wise Expense](https://github.com/NifasatBeg/CashFlow/blob/d19c1e334a8a0d00c36da27615e9240977250234/asssets/DMerchantExp.png)
![Date Picker](https://github.com/NifasatBeg/CashFlow/blob/d19c1e334a8a0d00c36da27615e9240977250234/asssets/EDetaildate.png)
![All Expense](https://github.com/NifasatBeg/CashFlow/blob/d19c1e334a8a0d00c36da27615e9240977250234/asssets/FDetailExp.png)


## Future Enhancements
- **Cloud Deployment** - Deploy backend services and frontend to AWS/GCP/Azure for better scalability.
- **Logs & Monitoring** - Integrate Grafana, Prometheus, and Loki for real-time monitoring and logging.
- **Receipt Upload & Expense Tracing** - Allow users to upload receipts and automatically extract expense details using OCR and AI.
- **Budgeting & Analytics** - Provide users with insights and budgeting tools based on spending patterns.

## License
This project is for personal use. Feel free to modify and enhance it as needed.
