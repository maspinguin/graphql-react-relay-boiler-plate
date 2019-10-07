import { requestSubscription, graphql } from 'react-relay';
import { ConnectionHandler }  from 'relay-runtime';
import RelayService from '../services/RelayService';

const subscription = graphql`
    subscription ClientUpdateSubscription($input: clientUpdatedInput!) {
        clientUpdated(input:$input){
            viewer{
                id
                name
                email
                plainId
                status
            }
        }
    }
`;


function ClientUpdateSubscription(enviroment, input) {
    requestSubscription(enviroment, {
        subscription,
        variables: {
            input: {
                plainId: input.plainId
            },
        },
        onCompleted: (data) => {
            // console.log('data',data);
        },
        onError: (error) => {
            console.log(error);
        },
        onNext: (next) => {
            // console.log('onnext', next);
        },
        updater: store => {
            // Subscribe store
            const rootField = store.getRootField('clientUpdated');
            const name = rootField.getLinkedRecord('viewer').getValue('name');
            const email = rootField.getLinkedRecord('viewer').getValue('email');
            const status = rootField.getLinkedRecord('viewer').getValue('status');

            // Root Store
            let root = store.getRoot();
            root = root.getLinkedRecord('viewer').getLinkedRecord('client', {id: '2'});
            root.setValue(status, 'status');
            root.setValue(email, 'email');
            root.setValue(name, 'name');
        }
    });

}

export default ClientUpdateSubscription;
