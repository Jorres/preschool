#include <iostream>
#include <vector>
#include <ctime>
#include <cmath>
#include <cassert>

using namespace std;

using calc_type = double;

calc_type get_rand_double(calc_type l, calc_type r) {
    int mod = (int)((abs(l) + abs(r)) * 10);
    calc_type inside = rand() % mod - abs(l) * 10;
    return inside / 10.0;
}

calc_type sigmoid(calc_type value) {
    return 1.0 / (1.0 + exp(-value));
}

calc_type sigmoid_der(calc_type value) {
    return sigmoid(value) * sigmoid(1 - value);
}

calc_type relu(calc_type value) {
    return (value > 0 ? value : 0);
}

calc_type relu_der(calc_type value) {
    return (value >= 0 ? 1 : 0);
}

calc_type sqr(calc_type a) {
    return a * a;
}

struct t_node {
    vector<calc_type> weights;
    calc_type bias;
    calc_type value;
    calc_type non_activated;

    void init_rand(int from, int to) {
        calc_type L = -5, R = 5;
        weights.assign(to - from, 0);
        for (int i = from; i < to; i++) {
            weights[i - from] = get_rand_double(L, R);
        }
        bias = get_rand_double(L, R);
    }
};

struct t_layer {
    vector<t_node> nodes;
    int from;
    int to;

    calc_type(*activate)(calc_type);
    calc_type(*activate_der)(calc_type);

    t_layer(int size) {
        nodes.assign(size, t_node());
    }

    t_layer(calc_type(*_activate)(calc_type), calc_type(*_activate_der)(calc_type), int size)
        : activate(_activate)
        , activate_der(_activate_der) {
        nodes.assign(size, t_node());
    }

    void init_layer() {
        for (int i = 0; i < (int)nodes.size(); i++) {
            nodes[i].init_rand(from, to);
        }
    }

    int size() {
        return nodes.size();
    }
};

struct t_image {
    vector<calc_type> data;
    int number;

    calc_type calc_loss(vector<calc_type>& prediction) {
        calc_type res = 0;
        for (int i = 0; i < (int)prediction.size(); i++) {
            if (number == i) {
                res += sqr(1 - prediction[i]);
            } else {
                res += sqr(prediction[i]);
            }
        }
        return res;
    }
};

uint32_t get_uint(FILE* f) {
    unsigned char bytes[4];
    assert(fread(bytes, sizeof(bytes), 1, f) == 1);
    return (uint32_t)((bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3]);
}

unsigned char get_char(FILE* f) {
    unsigned char bytes[1];
    assert(fread(bytes, sizeof(bytes), 1, f) == 1);
    return bytes[0];
}

bool skip_magic(FILE* f_img, FILE* f_img_label, int amount) {
    const uint32_t TRAINING_LABEL_CHECKSUM = 2049;
    const uint32_t TRAINING_CHECKSUM = 2051;
    const uint32_t TRAIN_SIZE = amount;
    const uint32_t PIC_SIZE = 28;

    if (get_uint(f_img) != TRAINING_CHECKSUM) {
        return false;
    }
    if (get_uint(f_img_label) != TRAINING_LABEL_CHECKSUM) {
        return false;
    }

    if (get_uint(f_img) != TRAIN_SIZE) {
        return false;
    }
    if (get_uint(f_img_label) != TRAIN_SIZE) {
        return false;
    }

    if (get_uint(f_img) != PIC_SIZE && get_uint(f_img) != PIC_SIZE) {
        // 2 times
        return false;
    }

    return true;
}

t_image get_image(FILE* f_img, FILE* f_img_label) {
    t_image image;
    image.number = (int)get_char(f_img_label);

    unsigned char bytes[28 * 28];
    assert(fread(bytes, sizeof(bytes), 1, f_img) == 1);
    for (int i = 0; i < 28 * 28; i++) {
        image.data.push_back((double)bytes[i] / 255);
    }
    return image;
}

struct t_net {
    vector<t_layer> layers;
    int cur_size;

    t_net() {
        cur_size = 0;
    }

    void append_layer(int size) {
        layers.push_back(t_layer(size));
        if (layers.size() > 1) {
            t_layer& pre_last = layers[layers.size() - 2];
            layers[layers.size() - 1].from = cur_size;
            layers[layers.size() - 1].to = cur_size + pre_last.size();
        } else {
            layers[layers.size() - 1].from = 0;
            layers[layers.size() - 1].to = 0;
        }

        layers[layers.size() - 1].init_layer();
        cur_size += layers.back().size();
    }

    void append_layer(calc_type(*activate)(calc_type), calc_type(*activate_der)(calc_type), int size) {
        layers.push_back(t_layer(activate, activate_der, size));
        if (layers.size() > 1) {
            t_layer& pre_last = layers[layers.size() - 2];
            layers[layers.size() - 1].from = cur_size;
            layers[layers.size() - 1].to = cur_size + pre_last.size();
        } else {
            layers[layers.size() - 1].from = 0;
            layers[layers.size() - 1].to = 0;
        }

        layers[layers.size() - 1].init_layer();
        cur_size += layers.back().size();
    }

    void print_f_layer() {
        for (int i = 0; i < layers.back().size(); i++) {
            for (int j = 0; j < (int)layers.back().nodes[i].weights.size(); j++) {
                cout << layers.back().nodes[i].weights[j] << " ";
            }
            cout << "   " << layers.back().nodes[i].bias << endl;
        }
    }

    vector<calc_type> run(t_image& image) {
        vector<calc_type> data = image.data;
        vector<calc_type> next(layers[1].size());
        for (int i = 0; i < (int)image.data.size(); i++) {
            layers[0].nodes[i].value = image.data[i];
        }

        for (int i = 1; i < (int)layers.size(); i++) {
            next.assign(layers[i].size(), 0);
            int pos = 0;
            for (auto& node : layers[i].nodes) {
                for (int j = 0; j < (int)node.weights.size(); j++) {
                    next[pos] += node.weights[j] * data[j];
                }
                next[pos] += node.bias;
                node.non_activated = next[pos];
                next[pos] = layers[i].activate(next[pos]);
                node.value = next[pos];
                pos++;
            }
            data = next;
            if (i != (int)layers.size() - 1) {
                next.assign(layers[i + 1].size(), 0);
            }
        }
        assert((int)next.size() == layers.back().size());
        return next;
    }

    vector<calc_type> compute_derivatives(t_image& image) {
        int total_size = net_size();
        vector<calc_type> grad(total_size, 0);
        int cf = total_size;

        vector<calc_type> node_derivs(10, 0), new_node_derivs;
        for (int i = 0; i < 10; i++) {
            calc_type is_lit = (image.number == i ? 1 : 0);
            node_derivs[i] = 2 * (layers.back().nodes[i].value - is_lit);
        }

        for (int i = (int)layers.size() - 1; i > 0; i--) {
            // compute for weights and biases
            // compute for previous layer except when prev layer is last

            for (int j = (int)layers[i].nodes.size() - 1; j >= 0; j--) {
                cf -= (int)layers[i].nodes[j].weights.size() + 1; // + 1 for bias
                int cp = cf;
                t_node& cur = layers[i].nodes[j];
                calc_type activation_derivative = layers[i].activate_der(cur.non_activated);

                // back propagate weights
                for (int k = 0; k < (int)layers[i].nodes[j].weights.size(); k++) {
                    grad[cp++] = node_derivs[j]
                                 * activation_derivative
                                 * layers[i - 1].nodes[k].value;
                }

                // back propagate biases
                grad[cp++] = node_derivs[j]
                             * activation_derivative;
            }


            if (i != 1) {
                new_node_derivs.clear();
                new_node_derivs.assign(layers[i - 1].nodes.size(), 0);

                for (int j = 0; j < (int)layers[i - 1].nodes.size(); j++) {
                    for (int to = 0; to < (int)layers[i].nodes.size(); to++) {
                        new_node_derivs[j] += layers[i].nodes[to].weights[j]
                                              * layers[i].activate_der(layers[i].nodes[to].value)
                                              * node_derivs[to];
                    }
                }

                node_derivs = new_node_derivs;
            }
        }

        return grad;
    }

    int net_size() {
        int res = 0;
        for (int i = 1; i < (int)layers.size(); i++) {
            res += layers[i].nodes.size() * (layers[i - 1].nodes.size() + 1);
        }
        return res;
    }

    void apply_derivatives(const vector<calc_type>& grad) {
        int pos = 0;
        for (int i = 1; i < (int)layers.size(); i++) {
            for (auto& node : layers[i].nodes) {
                for (auto& weight : node.weights) {
                    weight += grad[pos++];
                }
                node.bias += grad[pos++];
            }
        }
        assert(pos == net_size());
    }

    void train() {
        int train_size = 60000;
        auto f_train = fopen("train.idx3-ubyte", "r");
        auto f_train_label = fopen("train-labels.idx1-ubyte", "r");
        assert(skip_magic(f_train, f_train_label, train_size));

        int pic_size = 28;

        append_layer(pic_size * pic_size);
        append_layer(sigmoid, sigmoid_der, /* neurons */ 300);
        append_layer(sigmoid, sigmoid_der, /* neurons */ 10);

        int sessions = 1500;
        int batch_size = train_size / sessions;
        int completion = 0;
        for (int i = 0; i < sessions; i++) {
            if (i > sessions / 100 * completion) {
                completion++;
                cout << "Training: " << completion << "%..." << endl;
            }

            vector<calc_type> grad(net_size(), 0);
            for (int j = 0; j < batch_size; j++) {
                t_image image = get_image(f_train, f_train_label);
                vector<calc_type> res = run(image);

                vector<calc_type> local_grad = compute_derivatives(image);
                for (int k = 0; k < (int)grad.size(); k++) {
                    grad[k] += local_grad[k];
                }
            }

            for (int k = 0; k < (int)grad.size(); k++) {
                grad[k] = -grad[k] / batch_size;
            }

            apply_derivatives(grad);
        }

        fclose(f_train);
        fclose(f_train_label);
    }
};

void validate(t_net& net) {
    int test_size = 10000;
    auto f_test = fopen("test.idx3-ubyte", "r");
    auto f_test_label = fopen("test-labels.idx1-ubyte", "r");
    assert(skip_magic(f_test, f_test_label, test_size));

    int correct = 0, incorrect = 0;

    for (int i = 0; i < test_size; i++) {
        t_image image = get_image(f_test, f_test_label);
        vector<calc_type> res = net.run(image);
        int max_id = 0;
        for (int j = 1; j < 10; j++) {
            if (res[j] > res[max_id]) {
                max_id = j;
            }
        }

        if (max_id == image.number) {
            correct++;
        } else {
            incorrect++;
        }
    }

    fclose(f_test);
    fclose(f_test_label);

    cout << "Correct: " << correct << endl;
    cout << "Incorrect: " << incorrect << endl;
    cout << "Accuracy: " << (calc_type)correct / test_size << endl;
}

int main() {
    srand(time(NULL));

    t_net net;
    net.train();
    validate(net);
}
