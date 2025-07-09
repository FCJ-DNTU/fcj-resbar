pipeline {
    agent any
    environment {
        ECR_REGISTRY = "730335321184.dkr.ecr.ap-southeast-1.amazonaws.com"
        BACKEND_REPO = "${ECR_REGISTRY}/backend-app-cyclone"
        FRONTEND_REPO = "${ECR_REGISTRY}/frontend-app-cyclone"
        AWS_REGION = "ap-southeast-1"
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
    }
    stages {
        stage('Build Backend') {
            steps {
                script {
                    def backendImage = docker.build("${env.BACKEND_REPO}:${env.BUILD_NUMBER}", "backend")
                    def backendImageLatest = docker.build("${env.BACKEND_REPO}:latest", "backend")
                    env.BACKEND_IMAGE = backendImage.id
                }
            }
        }
        stage('Build Frontend') {
            steps {
                script {
                    def frontendImage = docker.build("${env.FRONTEND_REPO}:${env.BUILD_NUMBER}", "frontend")
                    def frontendImageLatest = docker.build("${env.FRONTEND_REPO}:latest", "frontend")
                    env.FRONTEND_IMAGE = frontendImage.id
                }
            }
        }
        stage('Login to ECR') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access-key-id', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-access-key', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    sh """
                        aws ecr get-login-password --region ${env.AWS_REGION} | docker login --username AWS --password-stdin ${env.ECR_REGISTRY}
                    """
                }
            }
        }
        stage('Push Images') {
            steps {
                script {
                    docker.image(env.BACKEND_IMAGE).push("${env.BUILD_NUMBER}")
                    docker.image(env.BACKEND_IMAGE).push("latest")
                    docker.image(env.FRONTEND_IMAGE).push("${env.BUILD_NUMBER}")
                    docker.image(env.FRONTEND_IMAGE).push("latest")
                }
            }
        }
    }
}