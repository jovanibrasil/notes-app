install:
	npm install
start:
	npm start
build:
	npm build
test:
	npm test

# Mock servers
install-mock-dependencies:
	npm install express --save
	npm install cors
run-auth-server:
	node mock-servers/auth.js
run-notes-server:
	node mock-servers/notes.js

generate-deployables:
	ng build --prod --build-optimizer --configuration=production
	cp CNAME ./docs/