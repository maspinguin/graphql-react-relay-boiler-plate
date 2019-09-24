import * as React from 'react';
import { create } from 'react-test-renderer';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TestHelper from '../../helper/TestHelper';

import AppLoader from '../AppLoader';


// Mock relayService.environment with createMockEnvironment;
import RelayService from '../../services/RelayService';
import App from "../App";
jest.mock('../../services/RelayService');

describe('AppLoader', () => {
    let environment;

    beforeEach(() => {
        environment = createMockEnvironment();
        RelayService.environment = environment;
    });

    it('should render loader of App Loader', async () => {
        const wrapper = create(
            <AppLoader/>
        );

        const newError = new Error('Network Error');
        environment.mock.rejectMostRecentOperation(newError);

        const queryError = wrapper.root
            .findAllByType('div')
            .find(TestHelper.findInChildren(node => node === 'error'));
        expect(queryError).not.toEqual(undefined);
    });
});
