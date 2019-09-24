import * as React from 'react';
import { create } from 'react-test-renderer';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TestHelper from '../../../helper/TestHelper';

import Client from '../Client';
import ClientListLoader from '../ClientListLoader';
import ClientList from "../ClientList";

// Mock relayService.environment with createMockEnvironment;
import RelayService from '../../../services/RelayService';
jest.mock('../../../services/RelayService');

describe('AppLoader', () => {
    let environment;

    beforeEach(() => {
        environment = createMockEnvironment();
        RelayService.environment = environment;
    });

    it('should render loader of Client', async () => {
        const wrapper = create(
            <Router>
                <Client/>
            </Router>
        );

        const loading = wrapper.root
            .findAllByType('div')
            .find(TestHelper.findInChildren(node => node === 'loading...'));
        expect(loading).not.toEqual(undefined);
    });

    it('should render error of Client Loader', async () => {
        const wrapper = create(
            <Router>
                <Client/>
            </Router>
        );

        const newError = new Error('Network Error');
        environment.mock.rejectMostRecentOperation(newError);

        const queryError = wrapper.root
            .findAllByType('div')
            .find(TestHelper.findInChildren(node => node === 'error'));
        expect(queryError).not.toEqual(undefined);
    });

    it('should render success of Client List with no data', async () => {
        const wrapper = create(
            <Router>
                <Client/>
            </Router>
        );

        environment.mock.resolveMostRecentOperation(operation =>
            MockPayloadGenerator.generate(operation, {
                ClientEdge() {
                    return null;
                }
            })
        );

        const ClientWrapper = wrapper.root.findByType(ClientList);
        expect(ClientWrapper).not.toEqual(undefined);

        const noDataFound = ClientWrapper
            .findAllByType('td')
            .find(TestHelper.findInChildren(node => node === ' No data found.'));
        expect(noDataFound).not.toEqual(undefined);
    });

    it('should render success of Client List with 2 data', async () => {
        const wrapper = create(
            <Router>
                <Client/>
            </Router>
        );

        environment.mock.resolveMostRecentOperation(operation =>
            MockPayloadGenerator.generate(operation, {
                PageInfo() {
                    return {
                        hasNextPage: false,
                        hasPreviousPage: false,
                        startCursor: "YXJyYXljb25uZWN0aW9uOjA=",
                        endCursor: "YXJyYXljb25uZWN0aW9uOjE="
                    }
                },
                ClientEdge() {
                    return [
                        {
                            cursor: "YXJyYXljb25uZWN0aW9uOjA=",
                            node: {
                                email: "adhis.yudha@gmail.com",
                                id: "Q2xpZW50OjE=",
                                name: "Adhis Yudha",
                                plainId: "1"
                            }
                        },
                        {
                            cursor: "YXJyYXljb25uZWN0aW9uOjE=",
                            node: {
                                email: "bangkit.ilhamz@gmail.com",
                                id: "Q2xpZW50OjI=",
                                name: "Bangkit Ilham",
                                plainId: "2"
                            }
                        }
                    ]
                }
            })
        );

        const ClientWrapper = wrapper.root.findByType(ClientList);
        expect(ClientWrapper).not.toEqual(undefined);

        const tableWrapper = ClientWrapper
            .findByType('table');
        expect(tableWrapper).not.toEqual(undefined);

        const firstDataRow = tableWrapper
            .findAllByType('tr')
            .find(TestHelper.findByPropsId("Q2xpZW50OjE="));
        expect(firstDataRow.children[0].children[0]).toEqual('1');
        expect(firstDataRow.children[1].children[0]).toEqual('Adhis Yudha');
        expect(firstDataRow.children[2].children[0]).toEqual('adhis.yudha@gmail.com');
    });

    it('should render success of Client List with 12 data', async () => {
        const wrapper = create(
            <Router>
                <Client/>
            </Router>
        );

        environment.mock.resolveMostRecentOperation(operation =>
            MockPayloadGenerator.generate(operation, {
                PageInfo() {
                    return {
                        endCursor: "YXJyYXljb25uZWN0aW9uOjk=",
                        hasNextPage: true,
                        hasPreviousPage: false,
                        startCursor: "YXJyYXljb25uZWN0aW9uOjA="
                    }
                },
                ClientEdge() {
                    return [
                        {
                            cursor: "YXJyYXljb25uZWN0aW9uOjA=",
                            node: {
                                email: "adhis.yudha@gmail.com",
                                id: "Q2xpZW50OjE=",
                                name: "Adhis Yudha",
                                plainId: "1"
                            }
                        },
                        {
                            cursor: "YXJyYXljb25uZWN0aW9uOjE=",
                            node: {
                                email: "bangkit.ilhamz@gmail.com",
                                id: "Q2xpZW50OjI=",
                                name: "Bangkit Ilham",
                                plainId: "2"
                            }
                        },
                        {
                            cursor: "YXJyYXljb25uZWN0aW9uOjI=",
                            node: {
                                email: "herujoko@gmail.com",
                                id: "Q2xpZW50OjM=",
                                name: "Heru Joko",
                                plainId: "3"
                            }
                        },
                        {
                            cursor: "YXJyYXljb25uZWN0aW9uOjM=",
                            node: {
                                email: "bangkit@a1.com",
                                id: "Q2xpZW50OjQ=",
                                name: "d2f2sd",
                                plainId: "4"
                            }
                        },
                        {
                            cursor: "YXJyYXljb25uZWN0aW9uOjQ=",
                            node: {
                                email: "bangkit@a1.com",
                                id: "Q2xpZW50OjU=",
                                name: "d2f2sd",
                                plainId: "5"
                            }
                        },
                        {
                            cursor: "YXJyYXljb25uZWN0aW9uOjU=",
                            node: {
                                email: "bangkit@adfsf1.com",
                                id: "Q2xpZW50OjY=",
                                name: "fas",
                                plainId: "6"
                            }
                        },
                        {
                            cursor: "YXJyYXljb25uZWN0aW9uOjY=",
                            node: {
                                email: "bangkit@aa.com",
                                id: "Q2xpZW50Ojc=",
                                name: "bangkit",
                                plainId: "7"
                            }
                        },
                        {
                            cursor: "YXJyYXljb25uZWN0aW9uOjc=",
                            node: {
                                email: "bangkit@aa.com",
                                id: "Q2xpZW50Ojg=",
                                name: "bangkit",
                                plainId: "8"
                            }
                        },
                        {
                            cursor: "YXJyYXljb25uZWN0aW9uOjg=",
                            node: {
                                email: "bangkit@aa.com",
                                id: "Q2xpZW50Ojk=",
                                name: "bangkit",
                                plainId: "9"
                            }
                        }
                    ]
                }
            })
        );

        const ClientWrapper = wrapper.root.findByType(ClientList);
        expect(ClientWrapper).not.toEqual(undefined);

        const tableWrapper = ClientWrapper
            .findByType('table');
        expect(tableWrapper).not.toEqual(undefined);

        const loadMoreButton = tableWrapper
            .findAllByType('a')
            .find(TestHelper.findInChildren(node => node === 'Load more'));
        expect(loadMoreButton).not.toEqual(undefined);

        // click load more
        loadMoreButton.props.onClick();


        // resolve with last 2 data
        environment.mock.resolveMostRecentOperation(operation =>
            MockPayloadGenerator.generate(operation, {
                PageInfo() {
                    return {
                        endCursor: "YXJyYXljb25uZWN0aW9uOjEx",
                        hasNextPage: false,
                        hasPreviousPage: false,
                        startCursor: "YXJyYXljb25uZWN0aW9uOjEw"
                    }
                },
                ClientEdge() {
                    return [
                        {
                            cursor: "YXJyYXljb25uZWN0aW9uOjEw",
                            node: {
                                email: "bangkit@aa.com",
                                id: "Q2xpZW50OjEx",
                                name: "bangkit",
                                plainId: "11"
                            }
                        },
                        {
                            cursor: "YXJyYXljb25uZWN0aW9uOjEx",
                            node: {
                                email: "bangkit@aa.com",
                                id: "Q2xpZW50OjEy",
                                name: "bangkit",
                                plainId: "12"
                            }
                        }
                    ]
                }
            })
        );

        // load more button hide
        const _loadMoreButton = tableWrapper
            .findAllByType('a')
            .find(TestHelper.findInChildren(node => node === 'Load more'));
        expect(_loadMoreButton).toEqual(undefined);

    });

});
