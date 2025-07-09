pipeline {
    agent any
    environment {
        ECR_REGISTRY = "730335321184.dkr.ecr.ap-southeast-1.amazonaws.com"
        BACKEND_REPO = "${ECR_REGISTRY}/backend-app-cyclone"
        FRONTEND_REPO = "${ECR_REGISTRY}/frontend-app-cyclone"
        CREDENTIALS_ID = "ecr:aws-credentials"
    }
    stages {
        stage('Build Backend') {
            steps {
                script {
                    backendImage = docker.build("${env.BACKEND_REPO}:${env.BUILD_NUMBER}", "backend")
                    backendImageLatest = docker.build("${env.BACKEND_REPO}:latest", "backend")
                }
            }
        }
        stage('Build Frontend') {
            steps {
                script {
                    frontendImage = docker.build("${env.FRONTEND_REPO}:${env.BUILD_NUMBER}", "frontend")
                    frontendImageLatest = docker.build("${env.FRONTEND_REPO}:latest", "frontend")
                }
            }
        }
        stage('Push Images') {
            steps {
                script {
                    docker.withRegistry("https://${env.ECR_REGISTRY}", env.CREDENTIALS_ID) {
                        backendImage.push()
                        backendImageLatest.push()
                    }
                    docker.withRegistry("https://${env.ECR_REGISTRY}", env.CREDENTIALS_ID) {
                        frontendImage.push()
                        frontendImageLatest.push()
                    }
                }
            }
        }
    }
}
