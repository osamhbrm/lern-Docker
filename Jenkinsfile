pipeline {
    agent any
    
    stages {
        stage('Login to ECR') {
            steps {
                script {
                    // الـ Role سيتكفل بالحصول على الـ Token تلقائياً
                    sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 612356096472.dkr.ecr.us-east-1.amazonaws.com"
                }
            }
        }
        
        stage('Build & Tag') {
            steps {
                script {
                    // بناء الصورة وعمل Tag لها
                    sh "docker build -t my-app:1.2  ."
                    sh "docker tag my-app:1.2 612356096472.dkr.ecr.us-east-1.amazonaws.com/my-app:1.2"
                }
            }
        }
        stage('Security Scan (Trivy)') {
            steps {
                script {
                    // فحص الصورة والبحث عن الثغرات الخطيرة فقط
                    // إذا وجد ثغرات من نوع CRITICAL سيقوم بفشل البناء (exit code 1)
                    sh "docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image --severity CRITICAL --exit-code 1 my-app:1.2"                }
            }
        }
        
        stage('Push to ECR') {
            steps {
                script {
                    // دفع النسخة المحددة والنسخة الأخيرة (latest)
                    sh "docker push 612356096472.dkr.ecr.us-east-1.amazonaws.com/my-app:1.2"
                 
                }
            }
        }
    }
    

}
