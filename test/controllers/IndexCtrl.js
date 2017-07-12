/**
 * Created by Marie on 10/07/2017.
 * Use case:
 * Should display the right page (index.html)
 * Should display the page (index.html)
 */
const express = require('express');
const router = express.Router();

const expect = require('expect');
const IndexCtrl = require('../../app/controllers/IndexCtrl');

describe('IndexCtrl', () => {
    describe('#getRoute', () => {
        let indexCtrl = new IndexCtrl();

        it('Should display the index.html page', () => {
            const req = {}

            const res = {
                render: view => {
                    expect(view).toBe('index')
                }
            }
            indexCtrl.toIndex(req, res);
        });
    });
});