pipeline {
    agent { label 'digital-ocean-agent' }
    
    environment {
        RECAPTCHA_KEY = credentials('RECAPTCHA_KEY');
    }

    stages {
 
        stage("Building project") {
            steps {
                echo 'Cloning git'
                sh 'rm notes-app -rf'
                git([url: 'https://github.com/jovanibrasil/notes-app.git', branch: 'master', credentialsId: '9bae9c61-0a29-483c-a07f-47273c351555'])
                echo 'Installing dependencies ...'
                sh 'npm install'
                echo 'Building ...'
                sh 'node --max_old_space_size=512 node_modules/@angular/cli/bin/ng build --configuration=production'
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
                //sh 'rm ~/workspace/notes-app ~/workspace/notes-app@tmp -rf'
            }
        }

    }
    
}
