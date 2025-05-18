pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/jyothikalakshmi/devops_prjct.git'
            }
        }

        stage('Build and Deploy') {
            steps {
                // Go to root folder, run docker commands
                sh 'docker-compose down'
                sh 'docker-compose up --build -d'
            }
        }
    }
}
