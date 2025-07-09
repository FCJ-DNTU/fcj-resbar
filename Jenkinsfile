pipeline {
    agent any
    environment {
        ECR_REGISTRY = "730335321184.dkr.ecr.ap-southeast-1.amazonaws.com"
        BACKEND_REPO = "${ECR_REGISTRY}/backend-app-cyclone"
        FRONTEND_REPO = "${ECR_REGISTRY}/frontend-app-cyclone"
        AWS_REGION = "ap-southeast-1"
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
        stage('Login to ECR') {
            steps {
                withAWS(credentials: 'aws-credentials', region: "${env.AWS_REGION}") {
                    sh """
                        aws ecr get-login-password --region ${env.AWS_REGION} | docker login --username AWS --password-stdin ${env.ECR_REGISTRY}
                    """
                }
            }
        }
        stage('Push Images') {
            steps {
                script {
                    backendImage.push("${env.BUILD_NUMBER}")
                    backendImage.push("latest")
                    frontendImage.push("${env.BUILD_NUMBER}")
                    frontendImage.push("latest")
                }
            }
        }
    }
}