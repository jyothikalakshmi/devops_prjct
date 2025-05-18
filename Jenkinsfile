pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // git branch:'main',url:'https://github.com/jyothikalakshmi/devops_prjct.git'
                checkout scm
            }
        }

        stage('Build and Deploy') {
            steps {
                // Go to root folder, run docker commands
                // sh 'docker-compose down'
                // sh 'docker-compose up --build -d'
                  bat 'echo Build and Deploy steps here'
            }
        }
    }
}
