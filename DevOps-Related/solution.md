# Week 6 - Jenkins CI/CD Challenge 🚀

## ✅ Task 1: Jenkins Pipeline for HealthNodes Project

In this task, I created a full-featured Jenkins pipeline to automate CI/CD for the **HealthNodes** application using Docker, SonarQube, Trivy, OWASP Dependency-Check, Docker Scout, and Email notifications.

---

## 🔧 Jenkinsfile

The pipeline uses a shared library (`@Library("Jenkins-Libraries-HealthNodes")`) and `agent none` with specific agents allocated to each stage.

### 📁 Key Environment Variables

- `DOCKER_HUB_CREDS`: For authenticating to Docker Hub
- Docker Image Names: `AI_IMAGE`, `BACKEND_IMAGE`, `FRONTEND_IMAGE`
- Secret credentials for MongoDB, JWT, Gemini API, Twilio, etc.
- `SONAR_PROJECT_KEY`: Used for static code analysis

---

## 📌 Stage-wise Breakdown

### 1. **Check Out**

- **Agent**: `Docker-SonarQube`
- **Purpose**: Clones the repository (release branch) and stashes the code for reuse.

---

### 2. **SonarQube Analysis**

- **Agent**: `Docker-SonarQube`
- **Purpose**: Performs static code analysis using SonarQube with exclusions for unnecessary folders like `node_modules`, `venv`, etc.

---

### 3. **Security Scan**

- **Agent**: `Trivy-Owasp`
- **Tools Used**:
  - Trivy (Filesystem scan)
  - OWASP Dependency-Check
- **Purpose**: Scans for vulnerabilities, secrets, and misconfigurations, then archives and stashes reports.

---

### 4. **Build Docker Images**

- **Agent**: `Docker-SonarQube`
- **Purpose**: Builds Docker images for AI, backend, and frontend services in parallel and tags them as `latest` and with build number.

---

### 5. **Docker Image Scan with Docker Scout**

- **Agent**: `Docker-SonarQube`
- **Purpose**: Performs CVE analysis for all Docker images using `docker scout` and generates markdown reports.

---

### 6. **Test Containers**

- **Agent**: `Docker-SonarQube`
- **Purpose**: Spins up services using `docker-compose.test.yml` and runs basic health checks using `curl`.

---

### 7. **Push to Docker Hub**

- **Agent**: `Docker-SonarQube`
- **Purpose**: Pushes all tagged images to Docker Hub after successful test runs.

---

### 8. **Docker Prune**

- **Agent**: `Docker-SonarQube`
- **Purpose**: Cleans up unused Docker images and containers.

---

## 🔁 Post Actions

- **Always**: Cleans up workspace, shuts down running containers, logs out Docker.
- **Success**: Sends email with reports attached.
- **Failure**: Sends failure email with reports and build link.

---

## ⚠️ Issues Faced & Resolutions

1. **Agent-Specific Plugin Conflicts**

   - Solved by distributing tasks to agents with compatible tool setups like `Trivy-Owasp` and `Docker-SonarQube`.

2. **Trivy Format Issue**

   - Used `--format table` to make `trivy-report.txt` readable and `archiveArtifacts`-friendly.

3. **Scout Report File Not Found**

   - Ensured correct output filenames and used `|| true` to avoid breaking pipeline on scan errors.

4. **Credential Injection in Shell Commands**
   - Ensured secrets like `NVD_API_KEY` and `DOCKER_HUB_CREDS` were injected securely using `withCredentials`.

---

## ✅ Outcome

Successfully implemented an end-to-end Jenkins CI/CD pipeline with integrated DevSecOps tools for HealthNodes. It automates:

- Code quality analysis
- Security scanning
- Docker image build & scan
- Service testing
- Docker Hub publishing
- Email notification on completion

Ready for next tasks! 🛠️

---

## ✅ Task 2: Multi-Branch Pipeline for Microservices

Although I haven’t fully implemented this yet, I understand the structure and will implement it tonight. Here's the planned design and approach based on the challenge requirements.

---

### 🧱 Application Structure

The project is composed of 3 microservices:

- **AI Service** – Located in `AI Models` repo/folder
- **Backend API** – Located in `backend` repo/folder
- **Frontend Client** – Located in `frontend` repo/folder

Each of these will have its own branch strategy (e.g., `main`, `release`, `feature/*`) and Jenkinsfile to support independent builds and testing.

---

### 🔧 Jenkins Multi-Branch Pipeline Setup

- **Job Type**: Multibranch Pipeline
- **Git Repos**: Connected to individual repos or a monorepo with subdirectories
- **Scan Strategy**:
  - Automatically detects branches like `main`, `dev`, `feature/*`
  - Triggers pipeline on push or PR

---

### 🛠️ Planned Jenkinsfile Example (for Each Service)

```groovy
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Test') {
            parallel {
                stage('Build') {
                    steps {
                        echo "Building service..."
                        // build commands
                    }
                }
                stage('Test') {
                    steps {
                        echo "Running tests..."
                        // test commands
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying service..."
                // deploy commands
            }
        }
    }
}
```

### 🔄 Simulating PR & Merge Workflow

- I’ll create a `feature/test-branch` in one of the services.
- Jenkins will auto-detect it via the Multibranch Pipeline scan.
- This simulates a real-world **pull request workflow** and validates pipeline response to new branches.

---

### 🤔 Why Multi-Branch Pipelines Matter in Microservices

| Benefit                 | Description                                                                       |
| ----------------------- | --------------------------------------------------------------------------------- |
| 🔍 Branch Visibility    | Automatically detects and builds new branches — useful for PRs and testing        |
| 🧩 Isolated Pipelines   | Each microservice builds and tests independently, reducing risk of global failure |
| 🧪 Fast Feedback Loops  | Developers can validate their feature branches without impacting others           |
| 📦 Parallel Deployments | Enables concurrent builds and testing across multiple services                    |

---

### ✅ Outcome (To Be Completed)

I’ve planned the structure and will be implementing the full multi-branch pipeline setup tonight. Once complete, this will allow my microservices-based app to:

- ✅ **Build and test branches independently**
- ✅ **Automatically trigger on feature/bugfix branches**
- ✅ **Deploy faster with less risk through isolated, parallel pipelines**

---

## ✅ Task 3: Configuring Jenkins Agents & Distributed Builds

In this task, I configured multiple **Jenkins agents** to run different parts of the pipeline based on tool and environment compatibility. This allowed for **distributed execution** of stages to improve performance, reliability, and maintainability.

---

### 🛠️ Agent Configuration & Verification

I configured the following dedicated agents:

| Agent Label        | Purpose/Tools Installed                                                       | Node OS | Key Tools                                |
| ------------------ | ----------------------------------------------------------------------------- | ------- | ---------------------------------------- |
| `Docker-SonarQube` | General purpose agent for Docker, SonarQube, image building, testing, pushing | Ubuntu  | Docker, docker-compose, SonarQube, Scout |
| `Trivy-Owasp`      | Security-focused agent for scanning                                           | Ubuntu  | Trivy, OWASP Dependency-Check            |

#### 🔹 How Agents Were Configured:

1. **Launch Method**: All agents were set up using **SSH** via Jenkins master.
2. **Node Labels**: Assigned specific labels (`Docker-SonarQube`, `Trivy-Owasp`) for easy targeting in pipeline stages.
3. **Tool Installation**:
   - Trivy and OWASP were installed using manual setup with official binaries.
   - Docker, SonarQube, and Scout CLI were set up using curl and chmod on agent nodes.
4. **Verification**:
   - Each agent was verified from Jenkins UI: **Manage Jenkins > Nodes > AgentName > Log**
   - Confirmed successful tool execution in pipeline stages (`sh` and `echo` outputs).
   - Ensured that each stage ran on the expected node by reviewing pipeline stage logs.

---

### ⚡ Benefits of Distributed Builds

#### 🔸 1. **Speed Improvement**

- Multiple agents enable **parallel execution** of stages like:
  - Docker image builds
  - Scout CVE scans
- Reduces overall pipeline duration significantly.

#### 🔸 2. **Specialized Environments**

- Security tools like Trivy and OWASP run on hardened, minimal agents.
- Ensures **clean, isolated environments** for security scans, reducing interference.

#### 🔸 3. **Reliability & Fault Tolerance**

- If one agent/node fails, the Jenkins master or other nodes remain unaffected.
- Promotes **horizontal scaling**, allowing more builds to run concurrently.

#### 🔸 4. **Resource Optimization**

- Heavy tasks (like image builds) don't overload a single node.
- Light tasks can run on lightweight agents, saving memory/CPU.

---

### ✅ Outcome

By setting up a distributed Jenkins build system using multiple agents, I ensured:

- Faster pipeline execution
- Better resource utilization
- Increased reliability and security
- Clean separation of responsibilities across nodes

This architecture is scalable and production-grade — ready for real-world DevOps workflows! 🔧🚀

---

## ✅ Task 4: Implementing RBAC in Jenkins

In this task, I implemented **Role-Based Access Control (RBAC)** in Jenkins to manage user permissions efficiently and securely.

---

### 🔐 RBAC Configuration Overview

RBAC was configured using the **Role-Based Authorization Strategy Plugin** in Jenkins.

#### 🔸 Steps Taken:

1. **Installed Plugin**:

   - Navigated to: `Manage Jenkins → Plugin Manager → Available`
   - Installed: `Role-based Authorization Strategy`

2. **Enabled RBAC**:

   - Go to `Manage Jenkins → Configure Global Security`
   - Selected **"Role-Based Strategy"** under Authorization

3. **Defined Roles**:

   - Navigated to: `Manage Jenkins → Manage and Assign Roles → Manage Roles`
   - Created roles:
     - `admin`: Full access
     - `dev`: Limited to building and viewing jobs
     - `viewer`: Read-only access to jobs and console logs

4. **Assigned Users to Roles**:
   - Used: `Manage Jenkins → Manage and Assign Roles → Assign Roles`
   - Example Assignments:
     - `admin` → my admin user
     - `dev` → developer1, developer2
     - `viewer` → intern1

---

## ✅ Task 5: Using Shared Libraries in Jenkins (Basic Level)

In this task, I created a **very basic shared library** to simplify and reuse some common steps in my Jenkins pipeline.

---

### 📁 Shared Library Setup

I created a GitHub repository named `Jenkins-Libraries-HealthNodes` with the following structure:

(root)
└── vars/
├── hello.groovy
└── dockerCleanup.groovy
└── ClonePublicRepo.groovy
└── ClonePrivateRepo.groovy

---

## ✅ Task 6: Security Scanning & Reporting

This task involved running **automated security scans** on the HealthNodes project as part of the CI/CD pipeline. The scans covered:

- Source code dependencies (via Trivy)
- Dockerfiles (via Trivy)
- Container images (via Docker Scout)

---

### 🔍 Summary of Scan Outputs

#### 🧪 1. **Trivy Filesystem Scan** (`trivy-report.txt`)

| Component                    | Type       | Vulnerabilities        | Misconfigs |
| ---------------------------- | ---------- | ---------------------- | ---------- |
| `AI Models/requirements.txt` | pip        | 2 (1 Critical, 1 High) | 0          |
| `backend/package-lock.json`  | npm        | 1 (High)               | 0          |
| `frontend/package-lock.json` | npm        | 1 (High)               | 0          |
| `backend/Dockerfile`         | dockerfile | 0                      | 2 (High)   |
| `frontend/Dockerfile`        | dockerfile | 0                      | 1 (High)   |
| `AI Models/Dockerfile`       | dockerfile | 0                      | 2 (High)   |

**Key Findings:**

- `Pillow` library had a critical vulnerability (`CVE-2023-50447`)
- `axios` was found vulnerable to SSRF (`CVE-2025-27152`) in both backend and frontend
- Dockerfiles missed `USER` directives and `--no-install-recommends` best practice

---

#### 🛠 2. **Docker Scout - Backend Report** (`backend-scout-report.md`)

| Image                    | Critical | High | Medium | Low |
| ------------------------ | -------- | ---- | ------ | --- |
| `healthnodes-backend:20` | 0        | 2    | 0      | 1   |

**Details**:

- `multer@1.4.5-lts.1`: Memory leak risk → fix by upgrading to `2.0.0`
- `axios@1.7.9`: SSRF & credential leak → fix by upgrading to `1.8.2`
- `brace-expansion`: Low severity regex inefficiency → fix available in newer version

---

#### 🛡 3. **Docker Scout - Frontend Report** (`frontend-scout-report.md`)

| Image                     | Critical | High | Medium | Low |
| ------------------------- | -------- | ---- | ------ | --- |
| `healthnodes-frontend:20` | 0        | 0    | 0      | 0   |

**Result**: ✅ No known vulnerabilities detected!

---

### 🛠 Remediation Steps Taken

1. **Dependency Upgrades**:

   - Upgraded `axios` to `1.8.2` in both frontend and backend
   - Upgraded `Pillow` to `10.3.0` to fix critical RCE vulnerability
   - Replaced vulnerable versions of `multer` and `brace-expansion`

2. **Dockerfile Hardening**:

   - Added `USER node` or similar non-root users
   - Appended `--no-install-recommends` to apt installs to reduce image size and surface

3. **Secrets & Environment Safety**:
   - Ensured `.env` files were removed and values were injected securely using Jenkins credentials

---

### 🔒 Why Automated Security Scanning is Critical

| Benefit                  | Description                                                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| 🕵️‍♀️ Early Detection       | Finds vulnerabilities during development before reaching production                                                  |
| 🔁 Continuous Monitoring | Every build is scanned automatically without manual effort                                                           |
| 🧰 DevSecOps Integration | Embeds security checks into CI/CD pipelines                                                                          |
| 💣 Risk Prevention       | Identifies misconfigurations (e.g., root user in Docker) that could lead to container escape or privilege escalation |
| 🔐 Compliance & Audits   | Helps satisfy security requirements for deployments in cloud/enterprise environments                                 |

---

### ✅ Outcome

Security scanning tools like **Trivy** and **Docker Scout** helped uncover and fix multiple vulnerabilities in both code and images. With automated scanning integrated into the pipeline:

- Vulnerabilities are caught before deployment
- Reports are archived and emailed
- CI/CD workflow becomes security-compliant and production-ready

---

## ✅ Task 7: Dynamic Pipeline Parameterization

In this task, I implemented **basic parameterization** in my Jenkins pipeline to make it more flexible and configurable based on runtime inputs.

---

### 🧩 What I Implemented

I updated my `Jenkinsfile` to accept two string parameters:

```groovy
pipeline {
    agent any

    parameters {
        string(name: 'TARGET_ENV', defaultValue: 'staging', description: 'Deployment target environment')
        string(name: 'APP_VERSION', defaultValue: '1.0.0', description: 'Application version to deploy')
    }

    stages {
        stage('Build') {
            steps {
                echo "🚀 Building version ${params.APP_VERSION} for ${params.TARGET_ENV} environment..."
                // Actual build steps
            }
        }

        stage('Deploy') {
            steps {
                echo "📦 Deploying version ${params.APP_VERSION} to ${params.TARGET_ENV}..."
                // Actual deployment logic
            }
        }
    }
}
```

---

### 🤔 Why Parameterization Matters

| Benefit                | Description                                                                  |
| ---------------------- | ---------------------------------------------------------------------------- |
| 🔄 Reusability         | Same pipeline can deploy to dev, staging, or prod — no code change needed    |
| ⚙️ Runtime Flexibility | Developers or DevOps can pass version/environment as needed during execution |
| ✅ Safer Deployment    | Prevents accidental deployment to production by making environment explicit  |
| 📦 Easier Rollbacks    | Can deploy any previous version just by setting `APP_VERSION`                |

---

### ✅ Outcome

The pipeline is now **dynamic and reusable** across multiple environments and versions. This flexibility is essential for real-world CI/CD workflows, especially in production where **manual trigger parameters** make pipelines **safe, fast, and controlled**.

---

## ✅ Task 8: Jenkins Email Notification System

In this task, I implemented an **email notification system** in Jenkins using the `emailext` plugin to notify stakeholders about pipeline success or failure.

---

### 📧 SMTP Configuration in Jenkins

1. **Navigate to**: `Manage Jenkins → Configure System`
2. **SMTP Setup**:
   - SMTP Server: `smtp.gmail.com`
   - Use SSL: ✅ (Port 465)
   - SMTP Username: `my-email@gmail.com`
   - SMTP Password: App password (created from Gmail's App Password section)
   - Reply-To Address: `my-email@gmail.com`
   - Charset: `UTF-8`
3. **Test Configuration**: Used the test mail feature to ensure email delivery worked.

---

### 🧩 Jenkinsfile Integration

Instead of a separate `Notify` stage, I added **email notifications in the `post` block** of the pipeline:

```groovy
post {
    success {
        emailext (
            subject: "✅ HealthNodes Pipeline Success - Build #${BUILD_NUMBER}",
            body: '''
            <h2>🎉 HealthNodes CI/CD Pipeline Success!</h2>

            <p><strong>Build Number:</strong> #${BUILD_NUMBER}</p>
            <p><strong>Status:</strong> ✅ SUCCESS</p>
            <p><strong>Duration:</strong> ${currentBuild.durationString}</p>

            <p>📦 Docker images pushed and ready for deployment!</p>

            <p><a href="${BUILD_URL}">View Full Build Details</a></p>
            ''',
            to: "adityakg99@gmail.com",
            mimeType: 'text/html',
            attachmentsPattern: 'trivy-report.txt, owasp-report.html, *.md'
        )
    }

    failure {
        emailext (
            subject: "❌ HealthNodes Pipeline Failed - Build #${BUILD_NUMBER}",
            body: '''
            <h2>❌ Pipeline Failure Alert</h2>

            <p><strong>Build Number:</strong> #${BUILD_NUMBER}</p>
            <p><strong>Status:</strong> ❌ FAILED</p>

            <p>Please check the <a href="${BUILD_URL}console">console output</a> for more details.</p>
            ''',
            to: "adityakg99@gmail.com",
            mimeType: 'text/html',
            attachmentsPattern: 'trivy-report.txt, owasp-report.html, *.md'
        )
    }
}

```

### ⚠️ Challenges & Resolutions

| Issue                | Resolution                                                                            |
| -------------------- | ------------------------------------------------------------------------------------- |
| Gmail blocking SMTP  | Enabled 2FA in Google account and generated an App Password                           |
| Email not delivered  | Verified email was not in spam, ensured correct sender/recipient settings             |
| No `emailext` plugin | Installed it via Plugin Manager: Email Extension Plugin                               |
| Attachment mismatch  | Corrected `attachmentsPattern` to match actual report names (`*.md`, `.html`, `.txt`) |

---

### 📩 Outcome

- Notifications are sent **automatically** on both pipeline success and failure.
- All important artifacts (**Trivy**, **OWASP**, **Docker Scout** reports) are **attached to the email**.
- Email templates are **rich in content**, include **HTML formatting**, and provide **links to build logs and reports**.

---

## ✅ Task 9: Troubleshooting, Monitoring & Debugging in Jenkins

This task focused on how I ensured the **stability and reliability** of my Jenkins CI/CD pipeline by applying effective troubleshooting, monitoring, and debugging techniques during the entire Week 6 challenge.

---

### 🛠️ Troubleshooting Strategies Used

| Problem Encountered                        | Troubleshooting Action                                           |
| ------------------------------------------ | ---------------------------------------------------------------- | --- | --------------------------------------------------------- |
| Pipeline stage fails silently (no output)  | Enabled `set -x` in shell scripts to show command execution      |
| Artifacts not found after stage completion | Verified `stash` and `unstash` usage and file paths              |
| Scout reports not generated properly       | Appended `                                                       |     | true` to prevent pipeline from failing due to scan issues |
| Agent not picking job                      | Checked node labels and availability in `Manage Jenkins → Nodes` |
| SonarQube not detecting sources            | Added exclusions and corrected source paths in scanner flags     |

---

### 📡 Monitoring Methods

- **Jenkins Blue Ocean View**: For visual monitoring of parallel stage status.
- **Email Notifications**: To alert success/failure immediately with attachments.
- **Console Logs**: Used `echo`, `printenv`, and `pwd` to trace stage issues.
- **Docker Logs**:
  - `docker logs <container>` to debug services during testing
  - `docker-compose logs` to view grouped logs for all services

---

### 🔍 Debugging Best Practices

- Used `echo` extensively to log progress, variable values, and context info.
- Added `|| true` to non-critical scan steps (like Trivy or Scout) to avoid build breaks.
- Used `archiveArtifacts` after every scan to verify output files existed.
- Ran stages manually in isolation using `when` conditions to isolate bugs.
- Cleaned up workspace and Docker environment after each run using `docker system prune -a -f` and `cleanWs()`.

---

### 💡 Reflections: Why This Matters

Maintaining a stable CI/CD pipeline requires **constant observation and quick adaptation**. Here’s why these practices are essential:

| Practice           | Benefit                                                                   |
| ------------------ | ------------------------------------------------------------------------- |
| ✅ Troubleshooting | Speeds up diagnosis of issues and shortens downtime                       |
| ✅ Monitoring      | Gives real-time insights and visibility into build health                 |
| ✅ Debugging       | Helps fine-tune pipelines, improve reliability, and reduce false failures |

---

### ✅ Outcome

With consistent use of logs, stage isolation, file validation, and cleanup routines, I was able to build a **stable, secure, and repeatable CI/CD pipeline**. These DevOps hygiene practices ensure better productivity, faster recovery from issues, and higher confidence in the build process.

Keeping your pipeline clean and monitored is not just optional — it’s **mission-critical** for reliable software delivery. 🔧🚀
