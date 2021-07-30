const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addCount = functions.firestore.document("products/{anyDocID}").onCreate(async(snap, context) => {
    const createdDocID = snap.id

    if(!context.auth){
        throw new functions.https.HttpsError(
            "unauthenticated",
            "Only Auth users have permission"
        );
    }
    
    const addedProductDocRef = admin.firestore().collection('products').doc(createdDocID);
    const keepcountDocRef = admin.firestore().collection('keepcount').doc('IRrPjxm082kbPniw5MIE');

    const doc = await keepcountDocRef.get()
    if(doc.data().count >= 8){
        // revert the creation
        await addedProductDocRef.delete()
        throw new functions.https.HttpsError(
            'failed-precondition',
            'You cant have more than 8 products'
        );
    }
    if(doc.data().count < 8){
        return keepcountDocRef.update({
            count: admin.firestore.FieldValue.increment(1)
        });
    }

    return null;

});

exports.checkStorage = functions.storage.bucket('cocacola-attempt.appspot.com').object().onFinalize(async (object, context) => {
    const filePath = object.name
    const keepcountDocRef = admin.firestore().collection('keepcount').doc('IRrPjxm082kbPniw5MIE');
    
    if(filePath.startsWith('Images/showcase/')){
        const storageFileRef = admin.storage().bucket('cocacola-attempt.appspot.com').file(filePath)
        const doc = await keepcountDocRef.get()
        if(doc.data().count >= 8){
            // Delete the image
            return storageFileRef.delete()
        }
        else{
            return functions.logger.log('Do nothing')
        }
    }
    return functions.logger.log('The files are not the files in focus right now')
});