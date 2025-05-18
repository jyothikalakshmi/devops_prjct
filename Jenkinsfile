// pipeline {
//     agent any

//     stages {
//         stage('Checkout') {
//             steps {
//                 // git branch:'main',url:'https://github.com/jyothikalakshmi/devops_prjct.git'
//                 checkout scm
//             }
//         }

//         stage('Build and Deploy') {
//             steps {
//                 // Go to root folder, run docker commands
//                 // sh 'docker-compose down'
//                 // sh 'docker-compose up --build -d'
//                   bat 'echo Build and Deploy steps here'
//             }
//         }
//     }
// }

pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build & Test') {
            steps {
                bat 'npm install'
                bat 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                bat 'docker build -t jyothika0706/myapp:latest .'
            }
        }
        stage('Push Docker Image') {
            steps {
                bat 'docker login -u jyothika0706 -p Chinni04@'
                bat 'docker push jyothika0706/myapp:latest'
            }
        }
    }
}
