pipeline {
    agent { label 'jenkins-slave' }
    
    stages {
 
        stage("Building project") {
            steps {
                echo 'Cloning git'
                git([url: 'https://github.com/jovanibrasil/notes-app.git', branch: 'master', credentialsId: ''])
                echo 'Installing dependencies ...'
                sh 'npm install'
                echo 'Building ...'
                sh 'node --max_old_space_size=512 ./node_modules/@angular/cli/bin/ng build --prod --build-optimizer'
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