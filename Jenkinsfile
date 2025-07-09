pipeline {
    agent any
    environment {
        ECR_REGISTRY = "730335321184.dkr.ecr.ap-southeast-1.amazonaws.com"
        BACKEND_REPO = "${ECR_REGISTRY}/backend-app-cyclone"
        FRONTEND_REPO = "${ECR_REGISTRY}/frontend-app-cyclone"
        NGINX_REPO = "${ECR_REGISTRY}/nginx-app-cyclone"
        AWS_REGION = "ap-southeast-1"
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
        stage('Build nginx') {
            steps {
                script {
                    def nginxImage = docker.build("${env.NGINX_REPO}:${env.BUILD_NUMBER}", "nginx")
                    def nginxImageLatest = docker.build("${env.NGINX_REPO}:latest", "nginx")
                    env.NGINX_IMAGE = nginxImage.id
                }
            }
        }
        stage('Login to ECR') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-jenkins-admin']]) {
                    sh """
                        aws ecr get-login-password --region ${env.AWS_REGION} | docker login --username AWS --password-stdin ${env.ECR_REGISTRY}
                    """
                }
            }
        }
         
    }
}