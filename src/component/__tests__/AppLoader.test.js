import * as React from 'react';
import { create } from 'react-test-renderer';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import TestHelper from '../../helper/TestHelper';

import AppLoader from '../AppLoader';
import App from "../App";

// Mock relayService.environment with createMockEnvironment;
import RelayService from '../../services/RelayService';
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

        const loading = wrapper.root
            .findAllByType('div')
            .find(TestHelper.findInChildren(node => node === 'loading...'));
        expect(loading).not.toEqual(undefined);
    });

    it('should render error of App Loader', async () => {
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

    it('should render success of App Loader', async () => {
        const wrapper = create(
            <AppLoader/>
        );

        environment.mock.resolveMostRecentOperation(operation =>
            MockPayloadGenerator.generate(operation, {
                String(context, generateId) {
                    if(context.name === 'id') {
                        return generateId;
                    }
                    if(context.name === 'plainId'){
                        return '1';
                    }
                }
            })
        );

        const AppWrapper = wrapper.root.findByType(App);
        expect(AppWrapper).not.toEqual(undefined);

    });
});
