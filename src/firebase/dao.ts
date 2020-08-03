import {db} from '../../config/firebase';
import {logger} from '../../config/chalk';

enum QueryOperators{
  LessThan = '<',
  LessThanOrEqual = '<=',
  Equal = '==',
  GreaterThanOrEqual = '>=',
  GreaterThan ='>',
  ArrayContains = 'array-contains',
  In = 'in',
  ArrayContainsAny = 'array-contains-any'
}

/** Queries
 * @param {string} collection: Firestore collection to perform query in
 * @param {string} field: Field to search for
 * @param {QueryOperators} queryOperator: Operator to query search
 * @param {string} value: Value to apply queryOperator
 * @return {Promise<FirebaseFirestore.QuerySnapshot<
 *  FirebaseFirestore.DocumentData>>} snapshot: Contains all
 *  documents that match query search
 */
async function queryInCollection(
  collection: string,
  field: string,
  queryOperator: QueryOperators,
  value: string
): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>> {
  const colRef = db.collection(collection);
  const snapshot = await colRef.where(field, queryOperator, value).get();
  return snapshot;
}


/** Fetches data from a specified Firestore Document
 * @param {string} collection: Firestore collection name document is in
 * @param {string} document: Firestore document name
 * @param {object} data: Data in dcoument
 */
async function getDocument(
  collection: string,
  document: string
) {
  try {
    const docRef = db.collection(collection).doc(document);
    const doc = await docRef.get();
    if ( !doc.exists ) {
      throw Error(`Document with ${document} ID` +
        `does not exist in ${collection}`);
    }
    return doc.data();
  } catch (err) {
    logger.errorLog({tag: 'getDocument', log: err});
    throw Error('Document does not exist');
  }
}

/** Adds data into a Firestore Document. Creates the document if
 * it doesn't exist already
 * @param {string} collection: Firestore collection name
 * @param {string} document: Firestore document name
 * @param {object} data: Data to insert
 */
async function addToDocument(
  collection: string,
  document: string,
  data: object
) {
  const res = await db
    .collection(collection)
    .doc(document)
    .set(data, {merge: true});
  logger.printLog({tag: `Updated `, log: data});
}

/** Adds data into an autogenerated Firestore Document in a
 * specified Firestore Collection
 * @param {string} collection: Firestore collection name
 * @param {object} data: Data to insert
 * @return {Promise<string>} docRef.id: The auto-generated Firestore Document Id
 */
async function addToCollection(
  collection: string,
  data: object
): Promise<string> {
  console.log('Trying to add', data);
  try {
    const docRef: FirebaseFirestore.DocumentReference = await db
      .collection(collection)
      .add(data);
    console.log('Added document with ID: ', docRef.id);
    return docRef.id;
  } catch (err) {
    logger.errorLog({tag: 'addToCollection', log: err});
    throw Error('Could not add document to collection');
  }
}

export {
  QueryOperators,
  queryInCollection,
  getDocument,
  addToDocument,
  addToCollection,
};
