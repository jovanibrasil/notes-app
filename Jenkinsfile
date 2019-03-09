pipeline {
    agent { label 'jenkins-slave' }
    
    environment {
        RECAPTCHA_KEY = credentials('RECAPTCHA_KEY');
    }

    stages {
 
        stage("Building project") {
            steps {
                echo 'Cloning git'
                git([url: 'https://github.com/jovanibrasil/notes-app.git', branch: 'master', credentialsId: '6f0b7a49-f376-4b3b-892e-0bebdc4a9182'])
                echo 'Installing dependencies ...'
                sh 'npm install'
                echo 'Building ...'
                sh 'node --max_old_space_size=480 ./node_modules/@angular/cli/bin/ng build --prod --build-optimizer --configuration=production'
            }
        }

        stage("Test project"){
            steps {
                echo 'Todo'
            }
        }

        stage("Deploy project"){
            steps {
                echo 'deploying the project ...'
                sh 'rm /var/www/notes/* -rf'
                sh 'cp ~/workspace/notes-app/dist/notes-app/* /var/www/notes/ -r'
            }
        }

        stage("Remove temporary files"){
            steps {
                echo 'cleaning ...'
                echo 'TODO'
                // echo 'rm ~/workspace/notes-app ~/workspace/notes-app@tmp -rf'
            }
        }

    }
    
}