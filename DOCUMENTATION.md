# **PetScale Project Documentation**

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Folder Structure](#folder-structure)
3. [API Documentation](#api-documentation)
4. [API Testing](#api-testing)
5. [Components Overview](#components-overview)
6. [Database Schema](#database-schema)
7. [Project Setup and Commands](#project-setup-and-commands)


## **Project Overview**

PetScale is a comprehensive pet weight tracking application. The platform enables pet owners to log and analyze their pets' weight trends, visualize data with charts, and receive personalized recommendations. The application integrates with a RESTful API and supports CRUD operations for managing pets and weight data.


## **Folder Structure**

### **API Documentation**
- Located in `API.md`, this document outlines all RESTful endpoints, including request and response formats.

### **API Testing**
- **Directory**: `api-testing/OSZIMT-LF12`
- Organized by entity (`Pet`, `User`, `Weight`) with `.bru` files (used for API testing tools like Bruno or Postman).


#### Unit Tests
- **Directory**: `lib/`
- **File**: `analytics.test.ts`
- **Purpose**: Tests for weight analytics and calculations.

### **API Implementation**
- **Directory**: `app/api/`
- **Endpoints**:
  - `/pet`: CRUD operations for pets.
  - `/user`: Deprecated; used for managing users.
  - `/weight`: CRUD operations for weight logs.

### **Frontend Components**
- **Directory**: `components/`
- UI elements and dialog forms for `Track Weight`, `Add Pet`, and `Delete Pet`.
- `WeightChart` component visualizes weight trends.

### **Database Integration**
- **Directory**: `prisma/`
- **Database**: SQLite (`dev.db`) for storing user, pet, and weight data.
- Prisma schema (`schema.prisma`) defines database relationships.

### UML Diagrams
- **File**: `UML-Sequence-Diagram_POST-api-pet.drawio.png`
- **Purpose**: Visual representation of the POST `/api/pet` endpoint process.

## **API Documentation**

Refer to `API.md` for detailed documentation of all endpoints. Below is a summary:

### Endpoints
| Entity     | Endpoint                        | Methods        |
|------------|---------------------------------|----------------|
| **User**   | `/user`, `/user/[userId]`       | GET, POST, PUT, DELETE |
| **Pet**    | `/pet`, `/pet/[petId]`          | GET, POST, PUT, DELETE |
| **Weight** | `/weight`, `/weight/[weightId]` | GET, POST, PUT, DELETE |

### Deprecated `/user` Endpoint

The `/user` endpoint is deprecated and used only for testing purposes. All features now operate with a default user setup.

## **API Testing**

API tests are located in the `api-testing/OSZIMT-LF12` directory, structured as follows:

### **Testing Files**
| Entity     | File Name                | Purpose                        |
|------------|--------------------------|--------------------------------|
| **Pet**    | `Create Pet.bru`         | Test the pet creation endpoint |
|            | `Query All Pets.bru`     | Retrieve all pets              |
|            | `Query Pet.bru`          | Retrieve a specific pet        |
|            | `Update Pet.bru`         | Update pet details             |
|            | `Delete Pet.bru`         | Delete a specific pet          |
| **Weight** | `Create Weight.bru`      | Test weight creation endpoint  |
|            | `Query All Weights.bru`  | Retrieve all weight records    |
|            | `Query Weight.bru`       | Retrieve a specific weight     |
|            | `Update Weight.bru`      | Update a weight record         |
|            | `Delete Weight.bru`      | Delete a weight record         |

These files can be imported into API testing tools like Postman or Bruno for integration tests.

### **Unit Tests**

Unit tests are implemented to verify the functionality of core features like analytics and weight calculations.

#### **Location**
- Test file: `lib/analytics.test.ts`

#### **Framework**
- The tests are written using [Vitest](https://vitest.dev/).

#### **Running Unit Tests**
To execute unit tests, run the following command:

```bash
pnpm test
```


## **Components Overview**

| Component Name             | Purpose                                             |
|----------------------------|-----------------------------------------------------|
| **TrackWeightForm**        | Dialog for tracking pet weight.                     |
| **CreatePetForm**          | Dialog for adding new pets.                         |
| **DeletePetForm**          | Dialog for deleting a pet and associated weights.   |
| **WeightChart**            | Visualizes pet weight trends over time.             |
| **UI Components**          | Buttons, cards, dialogs, inputs, labels, and selects. |


## **Database Schema**

### **User**
| Field       | Type      | Notes         |
|-------------|-----------|---------------|
| `id`        | `String`  | Primary Key   |
| `name`      | `String`  |               |
| `email`     | `String`  | Unique        |
| `createdAt` | `Date`    | Default: now  |
| `updatedAt` | `Date`    | Auto-updated  |

### **Pet**
| Field       | Type      | Notes                                |
|-------------|-----------|--------------------------------------|
| `id`        | `String`  | Primary Key                         |
| `name`      | `String`  |                                      |
| `species`   | `String`  |                                      |
| `breed`     | `String?` | Optional                            |
| `birthDate` | `Date`    |                                      |
| `userId`    | `String`  | Foreign Key referencing `User`      |
| `weights`   | `Weight[]`| One-to-many relationship with `Weight`|

### **Weight**
| Field       | Type      | Notes                                |
|-------------|-----------|--------------------------------------|
| `id`        | `String`  | Primary Key                         |
| `weight`    | `Float`   |                                      |
| `date`      | `Date`    |                                      |
| `petId`     | `String`  | Foreign Key referencing `Pet`       |


## **Project Setup and Commands**

### **Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/petscale.git
   cd petscale
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Apply Prisma schema:
   ```bash
   pnpm prisma db push
   ```

### **Scripts**
| Command         | Description                          |
|-----------------|--------------------------------------|
| `pnpm dev`      | Start the development server.        |
| `pnpm build`    | Build the application for production.|
| `pnpm start`    | Run the production server.           |
| `pnpm lint`     | Run ESLint for code quality checks.  |

### **Testing**
1. Import `.bru` files into your testing tool (e.g., Bruno/Postman).
2. Execute requests to validate API functionality.
